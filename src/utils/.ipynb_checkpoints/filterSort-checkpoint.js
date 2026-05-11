export const SORTS = Object.freeze({
  relevance:    { label: 'Relevance (default)',  cmp: () => 0 },
  stars_desc:   { label: 'Stars · high → low',   cmp: (a, b) => num(b.stars) - num(a.stars) },
  stars_asc:    { label: 'Stars · low → high',   cmp: (a, b) => num(a.stars) - num(b.stars) },
  name_asc:     { label: 'Name · A → Z',         cmp: (a, b) => a.fullName.localeCompare(b.fullName) },
})

const num = (v) => (v == null || !Number.isFinite(v) ? -Infinity : v)

export function applyFilters(items, filters, sortKey) {
  const { languages = [], minStars = 0, requireTopics = false, query = '' } = filters || {}
  const q = query.trim().toLowerCase()

  const filtered = items.filter((it) => {
    if (languages.length && !languages.includes(it.language || '—')) return false
    if (minStars > 0 && num(it.stars) < minStars) return false
    if (requireTopics && (!it.topics || it.topics.length === 0)) return false
    if (q) {
      const hay = [it.fullName, it.description, it.language, ...(it.topics || [])].join(' ').toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  const sort = SORTS[sortKey] || SORTS.relevance
  return filtered.slice().sort(sort.cmp)
}

export function languageFacets(items) {
  const counts = new Map()
  for (const it of items) {
    const k = it.language || '—'
    counts.set(k, (counts.get(k) || 0) + 1)
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
}