<script setup>
import { site } from '../../data/site.config.js'
import { dataTypeColor } from '../../utils/dataTypeColors.js'

defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <header class="project-header">
    <span class="data-badge" :style="{ borderColor: dataTypeColor(project.dataType), color: dataTypeColor(project.dataType) }">
      {{ project.dataType }}
    </span>
    <h1>{{ project.title }}</h1>
    <p class="project-group">{{ site.group }}</p>
    <ul class="member-list">
      <li v-for="member in site.members" :key="member.id">
        {{ member.fullName }} · {{ member.id }} · {{ member.role }}
      </li>
    </ul>
  </header>
</template>

<style scoped>
.project-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.data-badge {
  align-self: flex-start;
  border: 1px solid;
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 0.75rem;
}

h1 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
}

.project-group {
  color: var(--text-muted);
}

.member-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
