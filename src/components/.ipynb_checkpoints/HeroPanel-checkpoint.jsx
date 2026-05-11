import { Box, Container, Stack, Typography, Link } from '@mui/material'
import { Brand } from './AppHeader.jsx'
import SearchControl from './SearchControl.jsx'
import { palette } from '../theme.js'

export default function HeroPanel({ mode, busy, onSubmit, onModeChange }) {
  return (
    <Box sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box className="reveal reveal--1" sx={{ mb: 2 }}>
          <Brand size="lg" />
        </Box>

        <Typography
          className="reveal reveal--2"
          variant="subtitle1"
          sx={{ mb: { xs: 4, md: 5 }, fontSize: { xs: '1rem', md: '1.15rem' }, color: palette.ink2 }}
        >
          Find functionally similar GitHub repositories.
        </Typography>

        <Box className="reveal reveal--3" sx={{ mb: { xs: 5, md: 6 } }}>
          <SearchControl mode={mode} busy={busy} onSubmit={onSubmit} onModeChange={onModeChange} compact={false} />
        </Box>

        <Typography className="reveal reveal--4" variant="caption" sx={{ color: palette.ink3, display: 'block' }}>
          MetaSim · IEEE ICSME 2024 ·{' '}
          <Link href="https://ieeexplore.ieee.org/document/10795110/" target="_blank" rel="noreferrer">paper</Link>
          {' · '}
          <Link href="https://youtu.be/HnFnN3JclQw" target="_blank" rel="noreferrer">demo</Link>
        </Typography>
      </Container>
    </Box>
  )
}