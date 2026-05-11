import { useState, useEffect, useRef } from 'react'
import {
  Box, InputBase, IconButton, Stack, Typography, Tooltip,
  ToggleButtonGroup, ToggleButton, CircularProgress, Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/SearchRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded'
import { MODES } from '../api.js'
import { palette } from '../theme.js'

const EXAMPLES = [
  'facebook/react',
  'tensorflow/tensorflow',
  'torvalds/linux',
  'huggingface/transformers',
  'vercel/next.js',
]

export default function SearchControl({
  value = '', mode = 2, busy = false, onSubmit, onModeChange, compact = false,
}) {
  const [text, setText] = useState(value)
  const inputRef = useRef(null)
  useEffect(() => { setText(value) }, [value])

  const submit = () => {
    const v = text.trim()
    if (!v || busy) return
    onSubmit?.(v, mode)
  }
  const onKey = (e) => { if (e.key === 'Enter') { e.preventDefault(); submit() } }

  const fieldHeight = compact ? 46 : 62
  const fontSize = compact ? '1rem' : '1.125rem'

  return (
    <Box>
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 1, height: fieldHeight,
          pl: compact ? 1.5 : 2.5, pr: 0.75,
          bgcolor: palette.surface, border: `1px solid ${palette.rule2}`, borderRadius: 0.75,
          transition: 'border-color .15s ease, box-shadow .15s ease',
          '&:focus-within': {
            borderColor: palette.ink,
            boxShadow: '0 0 0 3px rgba(31,39,51,0.08)',
          },
        }}
      >
        <SearchIcon sx={{ color: palette.ink3, fontSize: compact ? 20 : 22 }} />
        <InputBase
          inputRef={inputRef}
          placeholder="owner/repo  —  e.g. facebook/react"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          sx={{
            flex: 1, fontSize, fontFamily: 'var(--mono)', color: palette.ink,
            '& input::placeholder': { color: palette.ink3, opacity: 1, fontFamily: 'var(--mono)' },
          }}
          inputProps={{ 'aria-label': 'Repository to find similar matches for', spellCheck: false }}
        />
        <Tooltip title="Find similar">
          <span>
            <IconButton
              onClick={submit}
              disabled={busy || !text.trim()}
              sx={{
                width: fieldHeight - 12, height: fieldHeight - 12,
                bgcolor: palette.ink, color: palette.surface, borderRadius: 0.5,
                '&:hover': { bgcolor: '#0F1722' },
                '&.Mui-disabled': { bgcolor: palette.rule2, color: palette.surface },
              }}
              aria-label="Search"
            >
              {busy ? <CircularProgress size={18} sx={{ color: 'inherit' }} /> :
                      <ArrowForwardIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.5}
        sx={{ mt: compact ? 0.75 : 2 }}
      >
        <ToggleButtonGroup
          exclusive size="small" value={mode}
          onChange={(_, v) => v && onModeChange?.(v)}
          aria-label="Embedding mode"
        >
          <ToggleButton value={1}>{MODES[1].label}</ToggleButton>
          <ToggleButton value={2}>{MODES[2].label}</ToggleButton>
        </ToggleButtonGroup>

        {!compact && (
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ pl: { sm: 1 } }}>
            <Typography variant="caption" sx={{ color: palette.ink3, mr: 0.5, alignSelf: 'center' }}>
              try
            </Typography>
            {EXAMPLES.map((e) => (
              <Chip
                key={e}
                label={e}
                variant="outlined"
                size="small"
                clickable
                onClick={() => { setText(e); onSubmit?.(e, mode) }}
                sx={{
                  fontFamily: 'var(--mono)', fontSize: 11,
                  borderColor: palette.rule2, color: palette.ink2,
                  '&:hover': { borderColor: palette.ink, color: palette.ink, bgcolor: 'transparent' },
                }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  )
}