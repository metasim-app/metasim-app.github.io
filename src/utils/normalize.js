// Defensive field extraction: the backend response shape isn't strictly
// documented, so we collect candidates and accept the first that's non-empty.

const pick = (obj, ...keys) => {
  for (const k of keys) {
    if (obj == null) continue
    const v = obj[k]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return undefined
}

const asNumber = (v) => {
  if (v == null || v === '') return null
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[, _]/g, ''))
  return Number.isFinite(n) ? n : null
}

const asArray = (v) => {
  if (!v) return []
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean)
  if (typeof v === 'string') {
    // accept "a, b, c" or "a;b;c" or JSON-looking arrays
    if (v.startsWith('[')) {
      try { const p = JSON.parse(v); if (Array.isArray(p)) return p.map(String) } catch {}
    }
    return v.split(/[,;|]/).map((s) => s.trim()).filter(Boolean)
  }
  return []
}

/** Extract a results array from the response, whatever shape it takes. */
export function extractList(body) {
  if (Array.isArray(body)) return body
  if (!body || typeof body !== 'object') return []
  for (const key of [
    'data', 'results', 'repositories', 'repos', 'matches',
    'items', 'similar', 'similar_repositories', 'payload',
  ]) {
    if (Array.isArray(body[key])) return body[key]
  }
  // last-ditch: first array-valued property
  for (const v of Object.values(body)) if (Array.isArray(v)) return v
  return []
}

/** Normalise one raw record into the shape the UI consumes. */
export function normalizeRepo(raw, idx = 0) {
  if (!raw || typeof raw !== 'object') return null

  // owner / repo / fullName
  const owner = pick(raw, 'owner', 'user', 'author', 'org', 'organization')
  const name  = pick(raw, 'name', 'repo', 'repo_name', 'repository_name', 'project')
  let fullName = pick(raw, 'full_name', 'repository', 'repo_full_name', 'fullName')
  if (!fullName && owner && name) fullName = `${owner}/${name}`
  if (!fullName && typeof raw.url === 'string') {
    const m = raw.url.match(/github\.com\/([^/]+\/[^/?#]+)/)
    if (m) fullName = m[1]
  }
  if (!fullName) fullName = String(name || `item-${idx + 1}`)

  const ownerName = owner || (fullName.includes('/') ? fullName.split('/')[0] : '')
  const repoName  = name  || (fullName.includes('/') ? fullName.split('/').slice(1).join('/') : fullName)

  const url = pick(raw, 'html_url', 'url', 'link', 'github_url') ||
    (fullName.includes('/') ? `https://github.com/${fullName}` : '')

  const description = pick(raw, 'description', 'desc', 'summary', 'about') || ''
  const language    = pick(raw, 'language', 'lang', 'primary_language') || ''
  const topics      = asArray(pick(raw, 'topics', 'tags', 'keywords', 'labels'))
  const license     = (() => {
    const l = pick(raw, 'license', 'license_name', 'licenseName')
    if (!l) return ''
    if (typeof l === 'string') return l
    return l.name || l.spdx_id || l.key || ''
  })()

  const stars  = asNumber(pick(raw, 'stargazers_count', 'stars', 'star', 'star_count', 'stargazers'))
  const forks  = asNumber(pick(raw, 'forks_count', 'forks', 'fork_count'))
  const issues = asNumber(pick(raw, 'open_issues_count', 'open_issues', 'issues'))
  const watchers = asNumber(pick(raw, 'watchers_count', 'watchers', 'subscribers_count'))
  const size   = asNumber(pick(raw, 'size'))

  // similarity may be 0-1 or 0-100; we normalise to 0-100 for display.
  const rawSim = pick(
    raw, 'similarity', 'similarity_score', 'score', 'cosine', 'distance', 'cos_sim',
  )
  const sim = asNumber(rawSim)
  let similarity = null
  if (sim != null) similarity = sim <= 1.0 ? sim * 100 : sim

  const updatedAt = pick(raw, 'updated_at', 'pushed_at', 'last_updated', 'updatedAt')
  const createdAt = pick(raw, 'created_at', 'createdAt')

  const readme = pick(raw, 'readme', 'readme_text', 'readme_content', 'README') || ''

  return {
    id: fullName + ':' + idx,
    fullName,
    ownerName,
    repoName,
    url,
    description: String(description).trim(),
    language: String(language).trim(),
    topics,
    license,
    stars, forks, issues, watchers, size,
    similarity,                  // 0..100 or null
    updatedAt: updatedAt || null,
    createdAt: createdAt || null,
    readme,
    raw,
  }
}

export function normalizeResponse(body) {
  const list = extractList(body)
  return list.map((r, i) => normalizeRepo(r, i)).filter(Boolean)
}
