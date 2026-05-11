import { Box, Container, Stack, Typography, Link, Divider } from '@mui/material'
import { palette } from '../theme.js'

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        borderTop: `1px solid ${palette.rule}`,
        bgcolor: palette.surface,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 6 }}
          justifyContent="space-between"
        >
          <Stack spacing={1} sx={{ maxWidth: 520 }}>
            <Typography
              sx={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: '1.1rem' }}
            >
              MetaSim<Box component="span" sx={{ color: palette.gold, ml: 0.5 }}>·</Box>
            </Typography>
            <Typography variant="caption" sx={{ color: palette.ink2, lineHeight: 1.7 }}>
              A search engine for finding functionally similar GitHub repositories
              from a curated index of 267.6K projects, built on metadata embeddings.
              Published at the IEEE International Conference on Software Maintenance
              and Evolution, 2024.
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 5 }}>
            <FooterColumn
              title="Research"
              items={[
                ['Paper · ICSME 2024', 'https://ieeexplore.ieee.org/document/10795110/'],
                ['Demo video', 'https://youtu.be/HnFnN3JclQw'],
                ['Repo2Vec (related)', 'https://arxiv.org/abs/2107.05112'],
              ]}
            />
            <FooterColumn
              title="Project"
              items={[
                ['GitHub org', 'https://github.com/metasim-app'],
                ['API', 'https://metadatas.net/api/get_data/'],
              ]}
            />
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ sm: 'center' }}
        >
          <Typography variant="caption" sx={{ color: palette.ink3 }}>
            UI © {new Date().getFullYear()} · A static client for{' '}
            <Box component="code" sx={{ fontFamily: 'var(--mono)' }}>metasim-app.github.io</Box>
          </Typography>
          <Typography variant="caption" sx={{ color: palette.ink3 }}>
            Set in Fraunces &amp; IBM&nbsp;Plex
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

function FooterColumn({ title, items }) {
  return (
    <Stack spacing={1}>
      <Typography className="eyebrow">{title}</Typography>
      {items.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ fontSize: 13, color: palette.ink2, '&:hover': { color: palette.goldHover } }}
        >
          {label}
        </Link>
      ))}
    </Stack>
  )
}
