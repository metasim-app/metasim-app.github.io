// ─── Number / date formatting ────────────────────────────────────────────

export function formatCount(n) {
  if (n == null || !Number.isFinite(n)) return '—'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, '') + 'k'
  return String(n)
}

export function formatRelative(iso) {
  if (!iso) return '—'
  const t = Date.parse(iso)
  if (!Number.isFinite(t)) return '—'
  const diff = (Date.now() - t) / 1000
  if (diff < 60)      return 'just now'
  if (diff < 3600)    return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400)   return Math.floor(diff / 3600) + 'h ago'
  if (diff < 2_592_000) return Math.floor(diff / 86400) + 'd ago'
  if (diff < 31_536_000) return Math.floor(diff / 2_592_000) + 'mo ago'
  return Math.floor(diff / 31_536_000) + 'y ago'
}

export function formatPct(n, digits = 1) {
  if (n == null || !Number.isFinite(n)) return '—'
  return n.toFixed(digits) + '%'
}
