// ─── CSV export ───────────────────────────────────────────────────────────
// RFC-4180-style quoting, UTF-8 BOM for Excel friendliness.

const COLS = [
  ['full_name',  (r) => r.fullName],
  ['url',        (r) => r.url],
  ['similarity', (r) => (r.similarity == null ? '' : r.similarity.toFixed(2))],
  ['stars',      (r) => r.stars ?? ''],
  ['forks',      (r) => r.forks ?? ''],
  ['issues',     (r) => r.issues ?? ''],
  ['watchers',   (r) => r.watchers ?? ''],
  ['language',   (r) => r.language || ''],
  ['license',    (r) => r.license || ''],
  ['topics',     (r) => (r.topics || []).join('; ')],
  ['description',(r) => r.description || ''],
  ['updated_at', (r) => r.updatedAt || ''],
  ['created_at', (r) => r.createdAt || ''],
]

const esc = (val) => {
  const s = String(val ?? '')
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
  return s
}

export function toCsv(items) {
  const head = COLS.map(([h]) => h).join(',')
  const rows = items.map((it) => COLS.map(([, fn]) => esc(fn(it))).join(','))
  return '\uFEFF' + [head, ...rows].join('\r\n')
}

export function downloadCsv(items, base = 'metasim-results') {
  const csv = toCsv(items)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  a.href = url
  a.download = `${base}_${ts}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
