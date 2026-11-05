<script setup>
import { ref, computed } from 'vue'
import { site, saveSiteOverride, resetSiteOverride, hasSiteOverride } from '../data/site.config.js'
import SectionEditor from '../components/admin/SectionEditor.vue'
import CollapsibleSection from '../components/blocks/CollapsibleSection.vue'

const status = ref('')
const overrideActive = ref(hasSiteOverride())
const sectionErrors = ref({})

const dataTypes = ['Tabular', 'Text', 'Image', 'Time series', 'Audio', 'Graph']

function addMember() {
  site.members.push({ fullName: '', id: '', role: '', gitLink: '' })
}

function removeMember(idx) {
  site.members.splice(idx, 1)
}

function addSection(project) {
  const n = project.sections.length + 1
  project.sections.push({ id: `section-${n}`, title: `Section ${n}`, defaultOpen: false, blocks: [] })
}

function removeSection(project, idx) {
  project.sections.splice(idx, 1)
}

function moveSection(project, idx, dir) {
  const sections = project.sections
  const target = idx + dir
  if (target < 0 || target >= sections.length) return
  ;[sections[idx], sections[target]] = [sections[target], sections[idx]]
}

function sectionsText(project) {
  return JSON.stringify(project.sections, null, 2)
}

function applySections(project, text) {
  try {
    const parsed = JSON.parse(text)
    if (!Array.isArray(parsed)) throw new Error('sections must be an array')
    project.sections = parsed
    sectionErrors.value[project.slug] = ''
    status.value = `Replaced sections for "${project.title}" from pasted JSON (not saved yet).`
  } catch (err) {
    sectionErrors.value[project.slug] = err.message
  }
}

function handleSave() {
  if (site.members.length === 0) {
    status.value = 'Not saved: add at least one group member first.'
    return
  }
  const blankProject = site.projects.find((p) => !p.title.trim())
  if (blankProject) {
    status.value = `Not saved: project "${blankProject.slug}" has no title.`
    return
  }
  if (site.projects.length !== 3) {
    status.value = `Not saved: expected exactly 3 projects, found ${site.projects.length}.`
    return
  }

  const ok = saveSiteOverride()
  overrideActive.value = true
  status.value = ok
    ? 'Saved to this browser. Other visitors still see the committed site.config.js until you copy this JSON back into the file.'
    : 'Could not save — localStorage is unavailable in this browser.'
}

function handleReset() {
  resetSiteOverride()
  overrideActive.value = false
  status.value = 'Reverted to the committed defaults in src/data/site.config.js.'
}

const exportText = computed(() => JSON.stringify(site, null, 2))

async function copyExport() {
  try {
    await navigator.clipboard.writeText(exportText.value)
    status.value = 'Copied current config as JSON — paste the relevant parts into site.config.js to publish.'
  } catch {
    status.value = 'Could not copy automatically — select the text below and copy manually.'
  }
}
</script>

<template>
  <div class="admin-view section-band">
    <div class="container admin-container">
      <h1>Edit site content</h1>
      <p class="admin-note">
        Changes here are saved only in <strong>this browser</strong> (localStorage) and are
        <strong>not visible to other visitors</strong>. To publish changes for everyone, copy the
        exported JSON at the bottom into <code>src/data/site.config.js</code> and commit it.
      </p>

      <div class="admin-actions">
        <button type="button" class="btn-save" @click="handleSave">Save to this browser</button>
        <button type="button" class="btn-reset" @click="handleReset">Reset to committed defaults</button>
        <span v-if="overrideActive" class="override-badge">Local override active</span>
      </div>
      <p v-if="status" class="status-line">{{ status }}</p>

      <section class="admin-section" aria-labelledby="course-admin-heading">
        <h2 id="course-admin-heading">Course information</h2>
        <div class="field-grid">
          <label>University<input v-model="site.university" type="text" /></label>
          <label>Major<input v-model="site.major" type="text" /></label>
          <label>Course<input v-model="site.course" type="text" /></label>
          <label>Semester<input v-model="site.semester" type="text" /></label>
          <label>Year<input v-model="site.year" type="text" /></label>
          <label>Teacher<input v-model="site.teacher" type="text" /></label>
          <label>Group name<input v-model="site.group" type="text" /></label>
          <label class="span-2">Repository link<input v-model="site.repoLink" type="text" /></label>
        </div>
      </section>

      <section class="admin-section" aria-labelledby="members-admin-heading">
        <h2 id="members-admin-heading">Group members</h2>
        <div v-for="(member, idx) in site.members" :key="idx" class="member-row">
          <label>Full name<input v-model="member.fullName" type="text" /></label>
          <label>Student ID<input v-model="member.id" type="text" /></label>
          <label>Role<input v-model="member.role" type="text" /></label>
          <label>GitHub link<input v-model="member.gitLink" type="text" /></label>
          <button type="button" class="btn-remove" @click="removeMember(idx)">Remove</button>
        </div>
        <button type="button" class="btn-add" @click="addMember">+ Add member</button>
      </section>

      <CollapsibleSection
        v-for="project in site.projects"
        :key="project.slug"
        :id="`admin-project-${project.slug}`"
        :title="`Project — ${project.title || project.slug}`"
      >
        <div class="project-body">
          <div class="field-grid">
            <label>Title<input v-model="project.title" type="text" /></label>
            <label>
              Data type
              <select v-model="project.dataType">
                <option v-for="t in dataTypes" :key="t" :value="t">{{ t }}</option>
              </select>
            </label>
            <label class="span-2">Summary<textarea v-model="project.summary" rows="2"></textarea></label>
            <label class="span-2">Problem<textarea v-model="project.problem" rows="2"></textarea></label>
            <label class="span-2">Dataset<textarea v-model="project.dataset" rows="2"></textarea></label>
            <label>Notebook (GitHub)<input v-model="project.notebook.github" type="text" /></label>
            <label>Notebook (Colab)<input v-model="project.notebook.colab" type="text" /></label>
            <label>PDF report path<input v-model="project.reportPdf" type="text" /></label>
            <label>YouTube URL<input v-model="project.youtube" type="text" /></label>
          </div>

          <div class="sections-area">
            <p class="subhead">Sections</p>
            <div class="sections-list">
              <SectionEditor
                v-for="(section, idx) in project.sections"
                :key="idx"
                :section="section"
                @remove="removeSection(project, idx)"
                @move-up="moveSection(project, idx, -1)"
                @move-down="moveSection(project, idx, 1)"
              />
            </div>
            <button type="button" class="btn-add" @click="addSection(project)">+ Add section</button>
          </div>

          <details class="json-paste">
            <summary>Paste JSON (advanced)</summary>
            <p class="admin-note small">
              Paste a full <code>sections</code> array here to replace this project's sections in one
              go — handy for pasting content prepared elsewhere. The box below shows the current
              value; edit it and click outside (or press Tab) to apply. This does not save to your
              browser until you click "Save to this browser" above.
            </p>
            <textarea
              class="json-textarea"
              :value="sectionsText(project)"
              rows="12"
              @change="applySections(project, $event.target.value)"
            ></textarea>
            <p v-if="sectionErrors[project.slug]" class="error-line">{{ sectionErrors[project.slug] }}</p>
          </details>
        </div>
      </CollapsibleSection>

      <section class="admin-section" aria-labelledby="export-admin-heading">
        <h2 id="export-admin-heading">Export</h2>
        <p class="admin-note small">
          Copy this JSON and merge it into <code>src/data/site.config.js</code> to make your edits
          permanent and visible to everyone.
        </p>
        <button type="button" class="btn-add" @click="copyExport">Copy JSON to clipboard</button>
        <textarea class="json-textarea" :value="exportText" rows="12" readonly></textarea>
      </section>
    </div>
  </div>
</template>

<style scoped>
.admin-view {
  padding-top: calc(var(--space) * 8);
  padding-bottom: calc(var(--space) * 10);
}

.admin-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

h1 {
  font-size: 1.8rem;
}

.admin-note {
  color: var(--text-muted);
  max-width: 72ch;
}

.admin-note.small {
  font-size: 0.85rem;
}

.admin-note code {
  background: var(--surface-2);
  padding: 2px 6px;
  border-radius: 4px;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-save,
.btn-reset,
.btn-add {
  border-radius: var(--radius);
  padding: 9px 16px;
  font-size: 0.9rem;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
}

.btn-save {
  background: var(--accent);
  border-color: var(--accent);
  color: #1a0f0b;
  font-weight: 500;
}

.btn-save:hover,
.btn-reset:hover,
.btn-add:hover {
  border-color: var(--accent-2);
}

.override-badge {
  font-size: 0.8rem;
  color: var(--success);
  border: 1px solid var(--success);
  border-radius: 999px;
  padding: 3px 10px;
}

.status-line {
  font-size: 0.9rem;
  color: var(--accent-2);
}

.admin-section {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-section h2 {
  font-size: 1.1rem;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.span-2 {
  grid-column: span 2;
}

@media (max-width: 640px) {
  .span-2 {
    grid-column: span 1;
  }
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

input,
select,
textarea {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 9px 12px;
  font-size: 0.92rem;
  font-family: inherit;
}

textarea {
  resize: vertical;
}

.member-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 12px;
  align-items: end;
}

@media (max-width: 1024px) {
  .member-row {
    grid-template-columns: 1fr;
  }
}

.btn-remove {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--accent);
  padding: 9px 12px;
  font-size: 0.85rem;
  height: fit-content;
}

.btn-remove:hover {
  border-color: var(--accent);
}

.project-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sections-area {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sections-area .subhead {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  margin: 0;
}

.sections-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.json-textarea {
  width: 100%;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.82rem;
  margin-top: 10px;
}

.json-paste {
  margin-top: 4px;
}

.json-paste summary {
  cursor: pointer;
  color: var(--accent-2);
  font-size: 0.9rem;
}

.error-line {
  color: var(--accent);
  font-size: 0.85rem;
  margin-top: 6px;
}
</style>
