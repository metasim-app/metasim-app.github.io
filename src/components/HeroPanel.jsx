import { Box, Container, Stack, Typography, Link, Grid } from '@mui/material'
import { Brand } from './AppHeader.jsx'
import SearchControl from './SearchControl.jsx'
import { palette } from '../theme.js'

const STATS = [
  { kv: '267.6K', label: 'public GitHub repositories indexed' },
  { kv: '97.8%',  label: 'similarity precision (combined mode)' },
  { kv: 'ICSME ’24', label: 'IEEE peer-reviewed' },
]

export default function HeroPanel({ mode, busy, onSubmit, onModeChange }) {
  return (
    <Box
      sx={{
        position: 'relative',
        pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 10 },
        // Top editorial rule, evokes a journal masthead
        '&::before': {
          content: '""',
          position: 'absolute', left: 0, right: 0, top: 0,
          borderTop: `1px solid ${palette.rule}`,
        },
        '&::after': {
          content: '""',
          position: 'absolute', left: 0, right: 0, top: 4,
          borderTop: `1px solid ${palette.rule}`,
        },
      }}
    >
      <Container maxWidth="md">
        {/* Eyebrow */}
        <Stack
          direction="row" alignItems="center" spacing={1.5} className="reveal reveal--1"
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Box sx={{ width: 22, height: 1, bgcolor: palette.gold }} />
          <Typography className="eyebrow">A search engine · ICSME 2024</Typography>
        </Stack>

        {/* Brand mark */}
        <Box className="reveal reveal--2" sx={{ mb: 2 }}>
          <Brand size="lg" />
        </Box>

        {/* Tagline */}
        <Typography
          className="reveal reveal--2"
          variant="subtitle1"
          sx={{
            maxWidth: 640, mb: { xs: 4, md: 5 }, fontSize: { xs: '1.05rem', md: '1.2rem' },
            color: palette.ink2,
          }}
        >
          Find <em>functionally similar</em> GitHub repositories by example.
          Query a repo you know — get a ranked list of close neighbours from a curated
          index of <strong style={{ color: palette.ink }}>267,600+ projects</strong>.
        </Typography>

        {/* Search */}
        <Box className="reveal reveal--3" sx={{ mb: { xs: 5, md: 7 } }}>
          <SearchControl
            mode={mode}
            busy={busy}
            onSubmit={onSubmit}
            onModeChange={onModeChange}
            compact={false}
          />
        </Box>

        {/* Stats strip */}
        <Box
          className="reveal reveal--4"
          sx={{
            borderTop: `1px solid ${palette.rule}`,
            borderBottom: `1px solid ${palette.rule}`,
            py: { xs: 2.5, md: 3 },
            mb: 3,
          }}
        >
          <Grid container spacing={2}>
            {STATS.map((s, i) => (
              <Grid item xs={12} sm={4} key={s.kv}>
                <Stack
                  direction="row" alignItems="baseline" spacing={1.5}
                  sx={{
                    pl: { sm: i === 0 ? 0 : 2 },
                    borderLeft: { sm: i === 0 ? 'none' : `1px solid ${palette.rule}` },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--display)',
                      fontWeight: 500,
                      fontSize: '1.75rem',
                      letterSpacing: '-0.02em',
                      color: palette.ink,
                    }}
                  >
                    {s.kv}
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.ink3 }}>
                    {s.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Citation */}
        <Typography
          className="reveal reveal--4"
          variant="caption"
          sx={{ color: palette.ink3, display: 'block', maxWidth: 720, lineHeight: 1.6 }}
        >
          Masud, M. R., Rokon, M. O. F., Yan, P., Islam, R., &amp; Faloutsos, M. (2024).{' '}
          <em>MetaSim: A Search Engine for Finding Similar GitHub Repositories.</em>{' '}
          In <em>2024 IEEE International Conference on Software Maintenance and Evolution (ICSME)</em>.{' '}
          <Link href="https://ieeexplore.ieee.org/document/10795110/" target="_blank" rel="noreferrer">
            ieeexplore.ieee.org/document/10795110
          </Link>
          {' · '}
          <Link href="https://youtu.be/HnFnN3JclQw" target="_blank" rel="noreferrer">demo video</Link>
        </Typography>
      </Container>
    </Box>
  )
}
