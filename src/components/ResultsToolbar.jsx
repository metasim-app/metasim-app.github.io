import {
  Stack, Typography, Button, ToggleButtonGroup, ToggleButton,
  Select, MenuItem, Box, IconButton, Tooltip,
} from '@mui/material'
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded'
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import { SORTS } from '../utils/filterSort.js'
import { palette } from '../theme.js'

export default function ResultsToolbar({
  query, mode, total, shown, view, sortKey, onView, onSort, onExport,
  filtersOpen, onToggleFilters,
}) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'stretch', md: 'center' }}
      spacing={2}
      sx={{ mb: 2.5 }}
    >
      {/* Count + query summary */}
      <Stack spacing={0.25} sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: palette.ink3, letterSpacing: '0.06em' }}>
          RESULTS FOR
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1.5} flexWrap="wrap">
          <Typography sx={{ fontFamily: 'var(--mono)', fontSize: '1.05rem', fontWeight: 600 }}>
            {query}
          </Typography>
          <Typography variant="caption" sx={{ color: palette.ink3 }}>
            mode <Box component="span" sx={{ fontFamily: 'var(--mono)', color: palette.ink2 }}>·{mode}·</Box> · {shown} of {total} shown
          </Typography>
        </Stack>
      </Stack>

      {/* Controls */}
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flexShrink: 0 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FilterAltRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={onToggleFilters}
          sx={{
            display: { md: 'none' },
            borderColor: palette.rule2, color: palette.ink2,
          }}
        >
          Filters
        </Button>

        <Select
          size="small"
          value={sortKey}
          onChange={(e) => onSort(e.target.value)}
          sx={{
            minWidth: 220, fontSize: 13, bgcolor: palette.surface,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: palette.rule2 },
          }}
        >
          {Object.entries(SORTS).map(([k, v]) => (
            <MenuItem key={k} value={k} sx={{ fontSize: 13 }}>{v.label}</MenuItem>
          ))}
        </Select>

        <ToggleButtonGroup
          exclusive size="small"
          value={view}
          onChange={(_, v) => v && onView(v)}
          sx={{ '& .MuiToggleButton-root': { p: 0.75 } }}
        >
          <Tooltip title="Card view"><ToggleButton value="cards" aria-label="Cards"><ViewModuleRoundedIcon sx={{ fontSize: 18 }} /></ToggleButton></Tooltip>
          <Tooltip title="Table view"><ToggleButton value="table" aria-label="Table"><TableRowsRoundedIcon sx={{ fontSize: 18 }} /></ToggleButton></Tooltip>
        </ToggleButtonGroup>

        <Tooltip title="Export filtered results as CSV">
          <span>
            <Button
              variant="contained"
              size="small"
              onClick={onExport}
              disabled={shown === 0}
              startIcon={<FileDownloadRoundedIcon sx={{ fontSize: 16 }} />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              CSV
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
