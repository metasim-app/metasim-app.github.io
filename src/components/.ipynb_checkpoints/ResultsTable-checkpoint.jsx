import {
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  Paper, Typography, Stack, Link, Box, Chip, Tooltip,
} from '@mui/material'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { formatCount } from '../utils/format.js'
import { palette } from '../theme.js'

export default function ResultsTable({ items }) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderColor: palette.rule, borderRadius: 0.75 }}>
      <Table size="small" sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 38 }}>#</TableCell>
            <TableCell>Repository</TableCell>
            <TableCell sx={{ width: 90 }} align="right">Stars</TableCell>
            <TableCell sx={{ width: 90 }} align="right">Forks</TableCell>
            <TableCell sx={{ width: 130 }}>Language</TableCell>
            <TableCell>Topics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((r, i) => (
            <TableRow
              key={r.id}
              hover
              sx={{
                '&:hover': { backgroundColor: palette.surface2 },
                '& td': { py: 1.1, verticalAlign: 'middle' },
              }}
            >
              <TableCell>
                <Typography variant="caption" sx={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: palette.ink3 }}>
                  {i + 1}
                </Typography>
              </TableCell>

              <TableCell>
                <Stack direction="row" alignItems="baseline" spacing={0.5}>
                  <Typography sx={{ fontFamily: 'var(--mono)', fontSize: 13, color: palette.ink3 }}>
                    {r.ownerName}/
                  </Typography>
                  <Link
                    href={r.url} target="_blank" rel="noreferrer"
                    sx={{
                      fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600,
                      color: palette.ink, textDecoration: 'none',
                      '&:hover': { color: palette.goldHover },
                    }}
                  >
                    {r.repoName}
                  </Link>
                  <Tooltip title="Open on GitHub">
                    <Link href={r.url} target="_blank" rel="noreferrer" sx={{ ml: 0.25, color: palette.ink3, '&:hover': { color: palette.ink } }}>
                      <OpenInNewRoundedIcon sx={{ fontSize: 13 }} />
                    </Link>
                  </Tooltip>
                </Stack>
                {r.description && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      color: palette.ink3, mt: 0.2,
                    }}
                  >
                    {r.description}
                  </Typography>
                )}
              </TableCell>

              <TableCell align="right">
                <Typography variant="caption" sx={{ fontFamily: 'var(--mono)' }}>
                  {formatCount(r.stars)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="caption" sx={{ fontFamily: 'var(--mono)' }}>
                  {formatCount(r.forks)}
                </Typography>
              </TableCell>

              <TableCell>
                {r.language ? (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: palette.ink2 }} />
                    <Typography variant="caption" sx={{ color: palette.ink2 }}>{r.language}</Typography>
                  </Stack>
                ) : (
                  <Typography variant="caption" sx={{ color: palette.ink3 }}>—</Typography>
                )}
              </TableCell>

              <TableCell>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {(r.topics || []).slice(0, 3).map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      variant="outlined"
                      sx={{ fontFamily: 'var(--mono)', fontSize: 10, height: 18, borderColor: palette.rule2 }}
                    />
                  ))}
                  {r.topics?.length > 3 && (
                    <Typography variant="caption" sx={{ color: palette.ink3 }}>
                      +{r.topics.length - 3}
                    </Typography>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}