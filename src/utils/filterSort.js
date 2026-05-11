// ─── Filtering & sorting helpers ──────────────────────────────────────────

export const SORTS = Object.freeze({
  similarity_desc: { label: 'Similarity · high → low',   cmp: (a, b) => num(b.similarity) - num(a.similarity) },
  similarity_asc:  { label: 'Similarity · low → high',   cmp: (a, b) => num(a.similarity) - num(b.similarity) },
  stars_desc:      { label: 'Stars · high → low',        cmp: (a, b) => num(b.stars) - num(a.stars) },
  stars_asc:       { label: 'Stars · low → high',        cmp: (a, b) => num(a.stars) - num(b.stars) },
  updated_desc:    { label: 'Recently updated',          cmp: (a, b) => dateNum(b.updatedAt) - dateNum(a.updatedAt) },
  name_asc:        { label: 'Name · A → Z',              cmp: (a, b) => a.fullName.localeCompare(b.fullName) },
})

const num = (v) => (v == null || !Number.isFinite(v) ? -Infinity : v)
const dateNum = (s) => { const t = s ? Date.parse(s) : NaN; return Number.isFinite(t) ? t : -Infinity }

/**
 * Apply UI filters and return a new sorted array.
 * Filters left blank/zero are treated as "no constraint".
 */
export function applyFilters(items, filters, sortKey) {
  const {
    languages = [],   // array of selected languages
    minStars  = 0,
    minSimilarity = 0,    // 0..100
    requireTopics = false,
    query = '',
  } = filters || {}

  const q = query.trim().toLowerCase()
  const filtered = items.filter((it) => {
    if (languages.length && !languages.includes(it.language || '—')) return false
    if (minStars > 0 && num(it.stars) < minStars) return false
    if (minSimilarity > 0 && num(it.similarity) < minSimilarity) return false
    if (requireTopics && (!it.topics || it.topics.length === 0)) return false
    if (q) {
      const hay = [
        it.fullName, it.description, it.language, ...(it.topics || []),
      ].join(' ').toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  const sort = SORTS[sortKey] || SORTS.similarity_desc
  return filtered.slice().sort(sort.cmp)
}

/** Build a histogram of languages from the result set, descending. */
export function languageFacets(items) {
  const counts = new Map()
  for (const it of items) {
    const k = it.language || '—'
    counts.set(k, (counts.get(k) || 0) + 1)
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
}
