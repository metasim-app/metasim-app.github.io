import {
  Box, Stack, Typography, Slider, Checkbox, FormControlLabel,
  TextField, InputAdornment, Divider, Button, Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/SearchRounded'
import RestartAltIcon from '@mui/icons-material/RestartAltRounded'
import { palette } from '../theme.js'
import { languageFacets } from '../utils/filterSort.js'

const Eyebrow = ({ children }) => (
  <Typography className="eyebrow" sx={{ mb: 1, display: 'block' }}>{children}</Typography>
)

export default function FiltersPanel({ items, filters, onChange, onReset }) {
  const facets = languageFacets(items)

  const update = (patch) => onChange?.({ ...filters, ...patch })

  return (
    <Stack
      spacing={3}
      sx={{
        p: 2.5,
        bgcolor: palette.surface,
        border: `1px solid ${palette.rule}`,
        borderRadius: 0.75,
        position: 'sticky', top: 92,
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: '1.05rem' }}>
          Refine
        </Typography>
        <Button
          size="small"
          startIcon={<RestartAltIcon sx={{ fontSize: 16 }} />}
          onClick={onReset}
          sx={{ color: palette.ink3, '&:hover': { color: palette.ink, bgcolor: 'transparent' } }}
        >
          reset
        </Button>
      </Stack>

      {/* Within-results search */}
      <Box>
        <Eyebrow>Search within results</Eyebrow>
        <TextField
          fullWidth
          size="small"
          value={filters.query}
          onChange={(e) => update({ query: e.target.value })}
          placeholder="filter by keyword"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 16, color: palette.ink3 }} />
              </InputAdornment>
            ),
            sx: { fontFamily: 'var(--mono)', fontSize: 13 },
          }}
        />
      </Box>

      <Divider />

      {/* Minimum similarity */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Eyebrow>Min similarity</Eyebrow>
          <Typography variant="caption" sx={{ fontFamily: 'var(--mono)', color: palette.ink2 }}>
            ≥ {filters.minSimilarity}%
          </Typography>
        </Stack>
        <Slider
          value={filters.minSimilarity}
          onChange={(_, v) => update({ minSimilarity: v })}
          min={0} max={100} step={5}
          marks={[{ value: 0, label: '0' }, { value: 50, label: '50' }, { value: 100, label: '100' }]}
          size="small"
          sx={{
            color: palette.gold,
            mt: 1,
            '& .MuiSlider-rail': { color: palette.rule2 },
            '& .MuiSlider-track': { color: palette.gold },
            '& .MuiSlider-markLabel': { fontSize: 10, color: palette.ink3, fontFamily: 'var(--mono)' },
            '& .MuiSlider-mark': { color: palette.rule2 },
            '& .MuiSlider-thumb': {
              width: 14, height: 14,
              boxShadow: '0 0 0 4px ' + palette.goldSoft,
            },
          }}
        />
      </Box>

      {/* Minimum stars */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Eyebrow>Min stars</Eyebrow>
          <Typography variant="caption" sx={{ fontFamily: 'var(--mono)', color: palette.ink2 }}>
            ≥ {filters.minStars >= 1000 ? `${(filters.minStars/1000).toFixed(0)}k` : filters.minStars}
          </Typography>
        </Stack>
        <Slider
          value={filters.minStars}
          onChange={(_, v) => update({ minStars: v })}
          min={0} max={50000} step={100}
          size="small"
          sx={{
            color: palette.ink, mt: 1,
            '& .MuiSlider-rail': { color: palette.rule2 },
            '& .MuiSlider-thumb': { width: 14, height: 14 },
          }}
        />
      </Box>

      {/* Has topics */}
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={filters.requireTopics}
            onChange={(e) => update({ requireTopics: e.target.checked })}
            sx={{
              color: palette.rule2,
              '&.Mui-checked': { color: palette.ink },
              p: 0.5,
            }}
          />
        }
        label={<Typography variant="body2">Has topics</Typography>}
      />

      <Divider />

      {/* Language facets */}
      <Box>
        <Eyebrow>Language</Eyebrow>
        {facets.length === 0 && (
          <Typography variant="caption" sx={{ color: palette.ink3 }}>—</Typography>
        )}
        <Stack spacing={0.5} sx={{ maxHeight: 230, overflowY: 'auto', pr: 0.5 }}>
          {facets.map((f) => {
            const selected = filters.languages.includes(f.name)
            return (
              <Stack
                key={f.name}
                direction="row" alignItems="center"
                onClick={() => {
                  const langs = selected
                    ? filters.languages.filter((x) => x !== f.name)
                    : [...filters.languages, f.name]
                  update({ languages: langs })
                }}
                sx={{
                  cursor: 'pointer',
                  py: 0.4, px: 0.5,
                  borderRadius: 0.5,
                  bgcolor: selected ? palette.goldSoft : 'transparent',
                  '&:hover': { bgcolor: selected ? palette.goldSoft : palette.surface2 },
                }}
              >
                <Box
                  sx={{
                    width: 8, height: 8, borderRadius: '50%',
                    bgcolor: selected ? palette.gold : palette.rule2, mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ flex: 1, color: selected ? palette.ink : palette.ink2, fontWeight: selected ? 500 : 400 }}
                >
                  {f.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontFamily: 'var(--mono)', color: palette.ink3 }}
                >
                  {f.count}
                </Typography>
              </Stack>
            )
          })}
        </Stack>
        {filters.languages.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
            {filters.languages.map((l) => (
              <Chip
                key={l}
                label={l}
                size="small"
                onDelete={() => update({ languages: filters.languages.filter((x) => x !== l) })}
                sx={{
                  bgcolor: palette.goldSoft, color: palette.ink,
                  '& .MuiChip-deleteIcon': { color: palette.ink2, '&:hover': { color: palette.ink } },
                }}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  )
}
