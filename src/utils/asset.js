/** Resolves a public/ asset path under the configured base path. */
export function asset(path) {
  if (!path) return ''
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${clean}`
}

/** Normalizes a YouTube URL or bare id into an embeddable id, or '' if invalid/empty. */
export function youtubeId(input) {
  if (!input) return ''
  const trimmed = input.trim()
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed

  try {
    const url = new URL(trimmed)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.slice(1)
    }
    if (url.pathname.includes('/shorts/')) {
      return url.pathname.split('/shorts/')[1]
    }
    const v = url.searchParams.get('v')
    if (v) return v
  } catch {
    return ''
  }
  return ''
}
