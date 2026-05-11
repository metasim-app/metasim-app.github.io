import { Box, Stack, Typography, Button, Link } from '@mui/material'
import { palette } from '../theme.js'

export function EmptyState({ title, body, action }) {
  return (
    <Box
      sx={{
        textAlign: 'center', py: 8, px: 3,
        border: `1px dashed ${palette.rule2}`,
        borderRadius: 0.75,
        bgcolor: palette.surface,
      }}
    >
      <Typography sx={{ fontFamily: 'var(--display)', fontSize: '1.4rem', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: palette.ink2, maxWidth: 480, mx: 'auto', mb: action ? 2.5 : 0 }}>
        {body}
      </Typography>
      {action}
    </Box>
  )
}

export function ErrorState({ error, onRetry }) {
  const isNetwork = error?.kind === 'network'
  const isInput   = error?.kind === 'input'
  return (
    <Box
      sx={{
        textAlign: 'left', py: 4, px: 3.5,
        border: `1px solid ${palette.rule2}`,
        borderLeft: `3px solid ${palette.danger}`,
        borderRadius: 0.75,
        bgcolor: palette.surface,
      }}
    >
      <Typography variant="overline" sx={{ color: palette.danger, fontWeight: 700 }}>
        {isInput ? 'Invalid query' : isNetwork ? 'Connection problem' : 'Search error'}
      </Typography>
      <Typography sx={{ fontFamily: 'var(--display)', fontSize: '1.25rem', mt: 0.5, mb: 1 }}>
        {error?.message || 'Something went wrong.'}
      </Typography>
      {isNetwork && (
        <Typography variant="body2" sx={{ color: palette.ink2, mb: 2 }}>
          The MetaSim backend at <code style={{ fontFamily: 'var(--mono)' }}>metadatas.net</code> may not
          allow cross-origin requests from this host yet. If you maintain the API, please add{' '}
          <code style={{ fontFamily: 'var(--mono)' }}>Access-Control-Allow-Origin</code> for{' '}
          <code style={{ fontFamily: 'var(--mono)' }}>metasim-app.github.io</code>.
        </Typography>
      )}
      <Stack direction="row" spacing={1.5}>
        {onRetry && (
          <Button variant="outlined" size="small" onClick={onRetry}>
            Try again
          </Button>
        )}
        <Button
          variant="text" size="small"
          component={Link} href="https://ieeexplore.ieee.org/document/10795110/"
          target="_blank" rel="noreferrer"
          sx={{ color: palette.ink2 }}
        >
          Read the paper
        </Button>
      </Stack>
    </Box>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 2.5,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          sx={{
            border: `1px solid ${palette.rule}`,
            borderRadius: 0.75,
            p: 2.5,
            bgcolor: palette.surface,
          }}
        >
          <Box className="shimmer" sx={{ height: 14, width: '60%', mb: 1.5 }} />
          <Box className="shimmer" sx={{ height: 4, width: '100%', mb: 2 }} />
          <Box className="shimmer" sx={{ height: 10, width: '95%', mb: 0.5 }} />
          <Box className="shimmer" sx={{ height: 10, width: '88%', mb: 0.5 }} />
          <Box className="shimmer" sx={{ height: 10, width: '70%', mb: 2 }} />
          <Stack direction="row" spacing={1}>
            <Box className="shimmer" sx={{ height: 18, width: 48 }} />
            <Box className="shimmer" sx={{ height: 18, width: 56 }} />
            <Box className="shimmer" sx={{ height: 18, width: 40 }} />
          </Stack>
        </Box>
      ))}
    </Box>
  )
}
