import { AppBar, Box, Toolbar, Typography, Link, Stack } from '@mui/material'
import SearchControl from './SearchControl.jsx'
import { palette } from '../theme.js'

/**
 * Compact masthead shown above results.
 * On the hero state we render only the brand (see HeroPanel).
 */
export default function AppHeader({
  query, mode, busy, onSubmit, onModeChange, condensed = true,
}) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: palette.bg,
        color: palette.ink,
        borderBottom: `1px solid ${palette.rule}`,
        backdropFilter: 'saturate(120%) blur(8px)',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          maxWidth: 1240, mx: 'auto', width: '100%',
          px: { xs: 2, md: 4 },
          gap: 3,
          minHeight: { xs: 72, md: 76 } + ' !important',
        }}
      >
        <Brand />
        <Box sx={{ flex: 1, maxWidth: 720 }}>
          <SearchControl
            value={query}
            mode={mode}
            busy={busy}
            onSubmit={onSubmit}
            onModeChange={onModeChange}
            compact
          />
        </Box>
        <Stack direction="row" spacing={2.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link
            href="https://ieeexplore.ieee.org/document/10795110/"
            target="_blank" rel="noreferrer"
            sx={{ fontSize: 13, color: palette.ink2 }}
          >
            Paper
          </Link>
          <Link
            href="https://youtu.be/HnFnN3JclQw"
            target="_blank" rel="noreferrer"
            sx={{ fontSize: 13, color: palette.ink2 }}
          >
            Demo
          </Link>
          <Link
            href="https://github.com/metasim-app"
            target="_blank" rel="noreferrer"
            sx={{ fontSize: 13, color: palette.ink2 }}
          >
            GitHub
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export function Brand({ size = 'sm' }) {
  const big = size === 'lg'
  return (
    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ userSelect: 'none' }}>
      <Typography
        sx={{
          fontFamily: 'var(--display)',
          fontWeight: 500,
          fontSize: big ? 'clamp(3.4rem, 7vw, 5.6rem)' : '1.5rem',
          letterSpacing: '-0.025em',
          color: palette.ink,
          lineHeight: 1,
          fontVariationSettings: '"opsz" 144, "SOFT" 50',
        }}
      >
        Meta<Box component="span" sx={{ fontStyle: 'italic', fontWeight: 400 }}>Sim</Box>
      </Typography>
      <Box
        sx={{
          width: big ? 10 : 6, height: big ? 10 : 6, borderRadius: '50%',
          bgcolor: palette.gold, alignSelf: 'center',
          boxShadow: '0 0 0 3px ' + palette.goldSoft,
        }}
      />
    </Stack>
  )
}
