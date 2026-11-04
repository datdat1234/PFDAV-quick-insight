<script setup>
import { dataTypeColor } from '../../utils/dataTypeColors.js'
import { useReveal } from '../../composables/useReveal.js'

defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { el } = useReveal()
</script>

<template>
  <article ref="el" class="project-card" data-reveal :style="{ transitionDelay: `${index * 60}ms` }">
    <p class="project-index">{{ String(index + 1).padStart(2, '0') }}</p>
    <h3>{{ project.title }}</h3>
    <span class="data-badge" :style="{ borderColor: dataTypeColor(project.dataType), color: dataTypeColor(project.dataType) }">
      {{ project.dataType }}
    </span>
    <p class="project-summary">{{ project.summary }}</p>
    <router-link :to="`/projects/${project.slug}`" class="view-link underline-link">
      View project →
    </router-link>
  </article>
</template>

<style scoped>
.project-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform var(--dur) var(--ease), border-color var(--dur) var(--ease);
}

.project-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-2);
}

.project-index {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 600;
}

h3 {
  font-size: 1.15rem;
}

.data-badge {
  align-self: flex-start;
  border: 1px solid;
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 0.75rem;
}

.project-summary {
  color: var(--text-muted);
  font-size: 0.92rem;
  flex-grow: 1;
}

.view-link {
  font-weight: 500;
  color: var(--accent-2);
}
</style>
