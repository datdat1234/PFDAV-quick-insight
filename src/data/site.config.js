import { reactive } from 'vue'
import { project as tabularChurn } from './projects/tabular-churn.js'
import { project as textSentiment } from './projects/text-sentiment.js'
import { project as imageDefect } from './projects/image-defect.js'

/** @typedef {import('./projectTypes.js').Member} Member */
/** @typedef {import('./projectTypes.js').Project} Project */

const defaultSite = {
  university: 'Đại học Bách Khoa – ĐHQG-HCM',
  major: 'Khoa Khoa học và Kỹ thuật Máy tính',
  course: 'Nền tảng lập trình cho phân tích và trực quan dữ liệu',
  semester: '261',
  year: '2026 - 2027',
  teacher: 'Lê Thành Sách',
  group: 'Group Quick Insight',
  repoLink: 'https://github.com/datdat1234/PFDAV-quick-insight',
  /** @type {Member[]} */
  members: [
    { fullName: 'Lê Phước Đạt', id: '2670266', role: 'Tabular', gitLink: 'https://github.com/datdat1234' },
    { fullName: 'Nguyễn Nhật Hạ', id: '2670276', role: 'Text', gitLink: 'https://github.com/nhatha32' },
  ],
  /**
   * Exactly 3 projects, one per file under `src/data/projects/`.
   * Edit a project's content in its own file; add/remove a project by
   * adding/removing an entry here and the matching file.
   * @type {Project[]}
   */
  projects: [tabularChurn, textSentiment, imageDefect],
}

const OVERRIDE_KEY = 'site-config-override'

function cloneSite(value) {
  return JSON.parse(JSON.stringify(value))
}

/** Guards against a corrupted/emptied override silently blanking the site. */
function isValidSite(value) {
  return (
    value &&
    Array.isArray(value.members) &&
    value.members.length > 0 &&
    value.members.every((m) => typeof m.fullName === 'string' && m.fullName.trim()) &&
    Array.isArray(value.projects) &&
    value.projects.length === 3 &&
    value.projects.every((p) => typeof p.title === 'string' && p.title.trim())
  )
}

function loadOverride() {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!isValidSite(parsed)) {
      console.warn('[site.config] ignoring invalid saved override (empty team/projects) — using committed defaults')
      localStorage.removeItem(OVERRIDE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

/** Reactive site data: starts from the committed defaults, or this browser's saved override if present. */
export const site = reactive(loadOverride() ?? cloneSite(defaultSite))

if (import.meta.env.DEV) {
  if (site.projects.length !== 3) {
    console.warn(`[site.config] expected exactly 3 projects, found ${site.projects.length}`)
  }
  const slugs = site.projects.map((p) => p.slug)
  const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  if (duplicates.length) {
    console.warn(`[site.config] duplicate project slugs: ${[...new Set(duplicates)].join(', ')}`)
  }
}

/** Persists the current `site` state to this browser's localStorage. Edits are local-only — other visitors still see the committed defaults. */
export function saveSiteOverride() {
  try {
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(site))
    return true
  } catch {
    return false
  }
}

/** Discards this browser's saved override and restores the committed defaults. */
export function resetSiteOverride() {
  try {
    localStorage.removeItem(OVERRIDE_KEY)
  } catch {
    /* localStorage unavailable */
  }
  Object.assign(site, cloneSite(defaultSite))
}

/** Whether this browser currently has a locally-saved override active. */
export function hasSiteOverride() {
  try {
    return localStorage.getItem(OVERRIDE_KEY) !== null
  } catch {
    return false
  }
}

export const defaultSiteConfig = defaultSite
