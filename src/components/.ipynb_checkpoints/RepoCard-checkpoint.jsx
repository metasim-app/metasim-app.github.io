import { Card, CardContent, Stack, Typography, Chip, Box, Link, Tooltip, IconButton } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import CallSplitRoundedIcon from '@mui/icons-material/CallSplitRounded'
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { formatCount } from '../utils/format.js'
import { palette } from '../theme.js'

export default function RepoCard({ repo, rank }) {
  return (
    <Card sx={{ height: '100%', position: 'relative', '&:hover': { borderColor: palette.ink2, transform: 'translateY(-1px)' } }}>
      <Box
        sx={{
          position: 'absolute', top: 14, right: 16,
          fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 14,
          color: palette.ink3, letterSpacing: '0.02em',
        }}
      >
        №{String(rank).padStart(2, '0')}
      </Box>

      <CardContent sx={{ p: 2.5, pb: 2 + '!important', pr: 5 }}>
        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
          <Typography sx={{ fontFamily: 'var(--mono)', fontWeight: 500, fontSize: '0.95rem', color: palette.ink3 }}>
            {repo.ownerName}/
          </Typography>
          <Link
            href={repo.url} target="_blank" rel="noreferrer"
            sx={{
              fontFamily: 'var(--mono)', fontWeight: 600, fontSize: '1rem',
              color: palette.ink, textDecoration: 'none',
              '&:hover': { color: palette.goldHover },
            }}
          >
            {repo.repoName}
          </Link>
          <Tooltip title="Open on GitHub">
            <IconButton href={repo.url} target="_blank" rel="noreferrer" size="small"
              sx={{ ml: -0.5, color: palette.ink3, '&:hover': { color: palette.ink } }}>
              <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        </Stack>

        {repo.description && (
          <Typography
            variant="body2"
            sx={{
              color: palette.ink2,
              display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
              overflow: 'hidden', minHeight: '3.6em', mb: 1.5,
            }}
          >
            {repo.description}
          </Typography>
        )}

        {repo.topics?.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
            {repo.topics.slice(0, 5).map((t) => (
              <Chip key={t} label={t} variant="outlined" size="small"
                sx={{ fontFamily: 'var(--mono)', fontSize: 10.5, borderColor: palette.rule2, color: palette.ink2, height: 22 }} />
            ))}
            {repo.topics.length > 5 && (
              <Typography variant="caption" sx={{ color: palette.ink3, alignSelf: 'center', pl: 0.5 }}>
                +{repo.topics.length - 5}
              </Typography>
            )}
          </Stack>
        )}

        <Stack direction="row" spacing={2} alignItems="center"
          sx={{ pt: 1, borderTop: `1px solid ${palette.rule}`, color: palette.ink3 }}>
          {repo.language && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: palette.ink2 }} />
              <Typography variant="caption" sx={{ color: palette.ink2, fontWeight: 500 }}>
                {repo.language}
              </Typography>
            </Stack>
          )}
          <Stat icon={<StarRoundedIcon sx={{ fontSize: 14 }} />} value={formatCount(repo.stars)} />
          <Stat icon={<CallSplitRoundedIcon sx={{ fontSize: 14 }} />} value={formatCount(repo.forks)} />
          {repo.issues != null && (
            <Stat icon={<BugReportRoundedIcon sx={{ fontSize: 14 }} />} value={formatCount(repo.issues)} />
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

function Stat({ icon, value }) {
  return (
    <Stack direction="row" spacing={0.4} alignItems="center">
      {icon}
      <Typography variant="caption" sx={{ fontFamily: 'var(--mono)', color: 'inherit' }}>
        {value}
      </Typography>
    </Stack>
  )
}