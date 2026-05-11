// ─── API client for the MetaSim backend ──────────────────────────────────
// Endpoint: https://metadatas.net/api/get_data/?search={user/repo}&radio={1|2}
//
// `radio` selects the embedding mode:
//   1 — Readme-only (≈90% similarity precision per the ICSME 2024 paper)
//   2 — Description + Topics + Readme (≈98% precision — recommended)
//
// The response shape isn't strictly documented, so we accept the union of
// plausible shapes (top-level array, { data: [...] }, { results: [...] }, etc.)
// and normalise each item to a stable internal record. See utils/normalize.js.

const BASE = 'https://metadatas.net/api/get_data/'

export class MetaSimError extends Error {
  constructor(message, { kind = 'unknown', cause } = {}) {
    super(message)
    this.name = 'MetaSimError'
    this.kind = kind
    if (cause) this.cause = cause
  }
}

/**
 * Search MetaSim.
 * @param {string} search - "owner/repo" format, e.g. "facebook/react"
 * @param {1|2} radio    - embedding mode
 * @param {AbortSignal=} signal
 * @returns {Promise<unknown>} raw JSON; normalisation happens upstream.
 */
export async function searchMetaSim(search, radio = 2, signal) {
  const q = String(search || '').trim()
  if (!q) throw new MetaSimError('Provide a repository as owner/repo.', { kind: 'input' })
  if (!/^[^\s/]+\/[^\s/]+$/.test(q)) {
    throw new MetaSimError(
      'Format should be owner/repo (e.g. facebook/react).',
      { kind: 'input' },
    )
  }
  const url = `${BASE}?search=${encodeURIComponent(q)}&radio=${radio === 1 ? 1 : 2}`

  let res
  try {
    res = await fetch(url, { method: 'GET', signal, headers: { Accept: 'application/json' } })
  } catch (e) {
    if (e?.name === 'AbortError') throw e
    throw new MetaSimError(
      'Could not reach the MetaSim API. This may be a network or CORS issue — see README.',
      { kind: 'network', cause: e },
    )
  }
  if (!res.ok) {
    throw new MetaSimError(
      `MetaSim API returned ${res.status} ${res.statusText}.`,
      { kind: res.status === 404 ? 'not_found' : 'http' },
    )
  }
  let body
  try { body = await res.json() }
  catch (e) {
    throw new MetaSimError('MetaSim API returned a non-JSON body.', { kind: 'parse', cause: e })
  }
  return body
}

export const MODES = Object.freeze({
  1: { value: 1, label: 'Readme only',                    sub: '≈ 90% precision'  },
  2: { value: 2, label: 'Description + Topics + Readme',  sub: '≈ 98% precision · recommended' },
})
