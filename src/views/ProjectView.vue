<script setup>
import { computed, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { site } from '../data/site.config.js'
import BackButton from '../components/layout/BackButton.vue'
import ProjectHeader from '../components/project/ProjectHeader.vue'
import ProjectResources from '../components/project/ProjectResources.vue'
import CollapsibleSection from '../components/blocks/CollapsibleSection.vue'
import SectionRenderer from '../components/blocks/SectionRenderer.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const router = useRouter()

const projectIndex = computed(() => site.projects.findIndex((p) => p.slug === route.params.slug))
const project = computed(() => site.projects[projectIndex.value])

const prevProject = computed(() => {
  const idx = projectIndex.value
  return idx > 0 ? site.projects[idx - 1] : null
})
const nextProject = computed(() => {
  const idx = projectIndex.value
  return idx >= 0 && idx < site.projects.length - 1 ? site.projects[idx + 1] : null
})

const sectionRefs = ref({})

function setSectionRef(id, el) {
  if (el) sectionRefs.value[id] = el
}

function expandAll() {
  Object.values(sectionRefs.value).forEach((comp) => comp?.setOpen(true))
}

function collapseAll() {
  Object.values(sectionRefs.value).forEach((comp) => comp?.setOpen(false))
}

async function goToSection(id) {
  sectionRefs.value[id]?.setOpen(true)
  await nextTick()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function goToProject(slug) {
  router.push(`/projects/${slug}`)
}
</script>

<template>
  <div v-if="project" class="project-view">
    <div class="container top-row">
      <BackButton />
    </div>

    <section class="section-band">
      <div class="container">
        <ProjectHeader :project="project" />
      </div>
    </section>

    <section class="section-band alt">
      <div class="container problem-dataset">
        <div class="info-card">
          <h2>Problem</h2>
          <p>{{ project.problem }}</p>
        </div>
        <div class="info-card">
          <h2>Dataset</h2>
          <p>{{ project.dataset }}</p>
        </div>
      </div>
    </section>

    <section class="section-band">
      <div class="container">
        <ProjectResources :project="project" />
      </div>
    </section>

    <section class="section-band alt sections-area">
      <div class="container sections-layout">
        <nav class="toc" aria-label="Table of contents">
          <p class="toc-title">On this page</p>
          <ul>
            <li v-for="s in project.sections" :key="s.id">
              <a href="javascript:void(0)" @click="goToSection(s.id)">{{ s.title }}</a>
            </li>
          </ul>
        </nav>

        <div class="sections-main">
          <div class="expand-controls">
            <button type="button" @click="expandAll">Expand all</button>
            <button type="button" @click="collapseAll">Collapse all</button>
          </div>

          <div class="sections-list">
            <CollapsibleSection
              v-for="s in project.sections"
              :key="s.id"
              :ref="(el) => setSectionRef(s.id, el)"
              :id="s.id"
              :title="s.title"
              :default-open="!!s.defaultOpen"
            >
              <SectionRenderer :blocks="s.blocks" />
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </section>

    <section class="section-band prev-next-area">
      <div class="container prev-next">
        <button
          v-if="prevProject"
          type="button"
          class="nav-link prev"
          @click="goToProject(prevProject.slug)"
        >
          ← {{ prevProject.title }}
        </button>
        <span v-else></span>
        <button
          v-if="nextProject"
          type="button"
          class="nav-link next"
          @click="goToProject(nextProject.slug)"
        >
          {{ nextProject.title }} →
        </button>
      </div>
      <div class="container bottom-back">
        <BackButton />
      </div>
    </section>
  </div>
  <NotFoundView v-else />
</template>

<style scoped>
.top-row {
  padding-top: 24px;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.problem-dataset {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .problem-dataset {
    grid-template-columns: 1fr 1fr;
  }
}

.info-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.info-card p {
  color: var(--text-muted);
}

.sections-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .sections-layout {
    grid-template-columns: 220px 1fr;
  }
}

.toc {
  display: none;
}

@media (min-width: 1024px) {
  .toc {
    display: block;
    align-self: start;
    position: sticky;
    top: 88px;
  }
}

.toc-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.toc ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toc a {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.toc a:hover {
  color: var(--accent-2);
}

.expand-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.expand-controls button {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 8px 14px;
  font-size: 0.85rem;
}

.expand-controls button:hover {
  border-color: var(--accent-2);
}

.sections-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prev-next {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.nav-link {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 10px 16px;
  font-size: 0.9rem;
  max-width: 48%;
  text-align: left;
}

.nav-link.next {
  text-align: right;
  margin-left: auto;
}

.nav-link:hover {
  border-color: var(--accent-2);
}

.bottom-back {
  margin-top: 24px;
}
</style>
