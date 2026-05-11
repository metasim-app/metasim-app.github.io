import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Container, Grid, Drawer, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import HeroPanel from './components/HeroPanel.jsx'
import AppHeader from './components/AppHeader.jsx'
import AppFooter from './components/AppFooter.jsx'
import ResultsToolbar from './components/ResultsToolbar.jsx'
import FiltersPanel from './components/FiltersPanel.jsx'
import ResultsGrid from './components/ResultsGrid.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import { EmptyState, ErrorState, SkeletonGrid } from './components/States.jsx'

import { searchMetaSim, MetaSimError } from './api.js'
import { normalizeResponse } from './utils/normalize.js'
import { applyFilters } from './utils/filterSort.js'
import { downloadCsv } from './utils/csv.js'
import { palette } from './theme.js'

const DEFAULT_FILTERS = {
  languages: [],
  minStars: 0,
  minSimilarity: 0,
  requireTopics: false,
  query: '',
}

export default function App() {
  // ─── Query state ───────────────────────────────────────────────────────
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [mode, setMode] = useState(2)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null) // null = hero state, [] = no results, [r,…] = results
  const abortRef = useRef(null)

  // ─── UI state ──────────────────────────────────────────────────────────
  const [view, setView] = useState('cards')   // 'cards' | 'table'
  const [sortKey, setSortKey] = useState('similarity_desc')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // ─── Derived ───────────────────────────────────────────────────────────
  const filtered = useMemo(
    () => applyFilters(results || [], filters, sortKey),
    [results, filters, sortKey],
  )

  // ─── Actions ───────────────────────────────────────────────────────────
  async function runSearch(q, m) {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setSubmittedQuery(q)
    setMode(m)
    setBusy(true)
    setError(null)
    setResults(null)
    setFilters(DEFAULT_FILTERS)

    // Update URL so the page is shareable.
    const url = new URL(window.location.href)
    url.searchParams.set('q', q)
    url.searchParams.set('m', String(m))
    window.history.replaceState({}, '', url.toString())

    try {
      const raw = await searchMetaSim(q, m, ctrl.signal)
      const norm = normalizeResponse(raw)
      setResults(norm)
    } catch (e) {
      if (e?.name === 'AbortError') return
      const err = e instanceof MetaSimError ? e
        : new MetaSimError(e?.message || 'Search failed', { kind: 'unknown', cause: e })
      setError(err)
      setResults([])
    } finally {
      setBusy(false)
    }
  }

  // Restore from URL on first load.
  useEffect(() => {
    const u = new URL(window.location.href)
    const q = u.searchParams.get('q')
    const m = parseInt(u.searchParams.get('m') || '2', 10) === 1 ? 1 : 2
    if (q) runSearch(q, m)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onExport = () => {
    if (!filtered.length) return
    const base = `metasim_${submittedQuery.replace(/[^a-z0-9._-]/gi, '-')}_m${mode}`
    downloadCsv(filtered, base)
  }

  const hasSearched = results !== null || busy || error

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {hasSearched ? (
        <AppHeader
          query={submittedQuery}
          mode={mode}
          busy={busy}
          onSubmit={runSearch}
          onModeChange={(m) => { setMode(m); if (submittedQuery) runSearch(submittedQuery, m) }}
        />
      ) : null}

      {!hasSearched && (
        <HeroPanel
          mode={mode}
          busy={busy}
          onSubmit={runSearch}
          onModeChange={setMode}
        />
      )}

      {hasSearched && (
        <Container maxWidth="xl" sx={{ pt: 4, pb: 6, flex: 1 }}>
          <ResultsToolbar
            query={submittedQuery}
            mode={mode}
            total={results?.length || 0}
            shown={filtered.length}
            view={view}
            sortKey={sortKey}
            onView={setView}
            onSort={setSortKey}
            onExport={onExport}
            filtersOpen={drawerOpen}
            onToggleFilters={() => setDrawerOpen(true)}
          />

          <Grid container spacing={3}>
            {/* Filters (desktop) */}
            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <FiltersPanel
                items={results || []}
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)}
              />
            </Grid>

            {/* Main */}
            <Grid item xs={12} md={9}>
              {busy && <SkeletonGrid count={6} />}

              {!busy && error && (
                <ErrorState
                  error={error}
                  onRetry={() => runSearch(submittedQuery, mode)}
                />
              )}

              {!busy && !error && results && results.length === 0 && (
                <EmptyState
                  title="No similar repositories found."
                  body="The backend returned no matches for this query. Double-check the owner/repo
                        spelling — it must exist in the MetaSim corpus of indexed projects."
                />
              )}

              {!busy && !error && filtered.length > 0 && view === 'cards' && (
                <ResultsGrid items={filtered} />
              )}
              {!busy && !error && filtered.length > 0 && view === 'table' && (
                <ResultsTable items={filtered} />
              )}

              {!busy && !error && results && results.length > 0 && filtered.length === 0 && (
                <EmptyState
                  title="No results match the active filters."
                  body="Loosen the similarity, stars, or language filters to bring results back."
                />
              )}
            </Grid>
          </Grid>
        </Container>
      )}

      {/* Mobile filters drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 320, bgcolor: palette.bg, p: 2 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)}><CloseRoundedIcon /></IconButton>
        </Box>
        <FiltersPanel
          items={results || []}
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
      </Drawer>

      <AppFooter />
    </Box>
  )
}
