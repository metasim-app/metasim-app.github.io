import { createTheme } from '@mui/material/styles'

// ─── Editorial palette ────────────────────────────────────────────────────
// Warm off-white paper · cool slate ink · deep editorial gold (used sparingly)
export const palette = {
  bg:        '#FAF7F1', // warm off-white (page)
  surface:   '#FFFEFA', // card/raised surface
  surface2:  '#F3EFE6', // sunken panel / hover
  ink:       '#1F2733', // primary text — slate
  ink2:      '#4A5460', // secondary text
  ink3:      '#7E8694', // muted text / labels
  rule:      '#E6DFD2', // border (warm)
  rule2:     '#D6CDB9', // stronger border
  gold:      '#B07A1A', // accent — deep editorial gold (NOT yellow)
  goldHover: '#8E6213',
  goldSoft:  '#F1E5C8', // gold-tinted background wash
  ok:        '#5B7B4F',
  warn:      '#B86E2C',
  danger:    '#A23B2A',
}

// Distinctive type pairing — Fraunces (variable serif) + IBM Plex Sans/Mono.
// Avoids the Inter/Roboto default look.
const display = `'Fraunces Variable', 'Fraunces', 'Source Serif Pro', Georgia, serif`
const body    = `'IBM Plex Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif`
const mono    = `'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace`

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: palette.ink,  contrastText: '#FFFEFA' },
    secondary: { main: palette.gold, contrastText: '#FFFEFA' },
    background: { default: palette.bg, paper: palette.surface },
    text: { primary: palette.ink, secondary: palette.ink2, disabled: palette.ink3 },
    divider: palette.rule,
    success: { main: palette.ok },
    warning: { main: palette.warn },
    error:   { main: palette.danger },
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: body,
    htmlFontSize: 16,
    h1: { fontFamily: display, fontWeight: 500, letterSpacing: '-0.02em', fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05 },
    h2: { fontFamily: display, fontWeight: 500, letterSpacing: '-0.015em', fontSize: '2.25rem', lineHeight: 1.1 },
    h3: { fontFamily: display, fontWeight: 500, letterSpacing: '-0.01em',  fontSize: '1.625rem', lineHeight: 1.15 },
    h4: { fontFamily: display, fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.2 },
    h5: { fontFamily: body, fontWeight: 600, fontSize: '1.0625rem' },
    h6: { fontFamily: body, fontWeight: 600, fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.08em' },
    subtitle1: { fontFamily: display, fontStyle: 'italic', fontWeight: 400, fontSize: '1.125rem', color: palette.ink2 },
    subtitle2: { fontFamily: body, fontWeight: 500, fontSize: '0.875rem', color: palette.ink2 },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.55, color: palette.ink2 },
    caption: { fontSize: '0.75rem', letterSpacing: '0.02em', color: palette.ink3 },
    overline: { fontFamily: body, fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.14em', color: palette.ink3 },
    button: { fontFamily: body, fontWeight: 500, letterSpacing: '0.01em', textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--mono': mono,
          '--display': display,
          '--gold': palette.gold,
          '--gold-soft': palette.goldSoft,
          '--rule': palette.rule,
          '--ink': palette.ink,
          '--ink-2': palette.ink2,
          '--ink-3': palette.ink3,
          '--surface': palette.surface,
          '--surface-2': palette.surface2,
          '--bg': palette.bg,
        },
        body: {
          backgroundColor: palette.bg,
          // subtle paper grain so it's not flat
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(31,39,51,0.025) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          color: palette.ink,
          fontFeatureSettings: '"ss01", "cv11"',
        },
        '::selection': { background: palette.goldSoft, color: palette.ink },
        // Restrained scrollbar
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${palette.rule2} transparent`,
        },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-thumb': {
          background: palette.rule2,
          borderRadius: 10,
          border: `2px solid ${palette.bg}`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: false },
      styleOverrides: {
        root: { borderRadius: 4, paddingInline: 18, paddingBlock: 8, fontWeight: 500 },
        containedPrimary: {
          backgroundColor: palette.ink,
          '&:hover': { backgroundColor: '#0F1722' },
        },
        outlinedPrimary: {
          borderColor: palette.rule2,
          color: palette.ink,
          '&:hover': { backgroundColor: palette.surface2, borderColor: palette.ink },
        },
        textPrimary: { color: palette.ink, '&:hover': { backgroundColor: palette.surface2 } },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: palette.surface,
        },
        outlined: { borderColor: palette.rule },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0, variant: 'outlined' },
      styleOverrides: {
        root: {
          borderColor: palette.rule,
          backgroundColor: palette.surface,
          transition: 'border-color .18s ease, transform .18s ease, box-shadow .18s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.75rem',
          borderRadius: 3,
          height: 24,
          letterSpacing: '0.01em',
        },
        outlined: { borderColor: palette.rule2, backgroundColor: palette.surface },
      },
    },
    MuiTextField: { defaultProps: { variant: 'outlined' } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: palette.surface,
          '& fieldset': { borderColor: palette.rule2 },
          '&:hover fieldset': { borderColor: palette.ink2 + ' !important' },
          '&.Mui-focused fieldset': { borderColor: palette.ink + ' !important', borderWidth: 1 },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: palette.ink, fontSize: 12, padding: '6px 9px' },
        arrow: { color: palette.ink },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: palette.rule, fontSize: '0.875rem' },
        head: {
          backgroundColor: palette.surface2,
          fontWeight: 600,
          color: palette.ink2,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontSize: '0.7rem',
        },
      },
    },
    MuiDivider: { styleOverrides: { root: { borderColor: palette.rule } } },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: palette.ink,
          textDecorationColor: palette.rule2,
          textUnderlineOffset: '3px',
          '&:hover': { color: palette.goldHover, textDecorationColor: palette.gold },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderColor: palette.rule2,
          color: palette.ink2,
          fontSize: '0.8125rem',
          paddingInline: 12,
          '&.Mui-selected': {
            backgroundColor: palette.ink,
            color: palette.surface,
            '&:hover': { backgroundColor: '#0F1722' },
          },
        },
      },
    },
  },
})

export default theme
