<script setup>
import { useReveal } from '../../composables/useReveal.js'

defineProps({
  member: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { el } = useReveal()
</script>

<template>
  <div ref="el" class="member-card" data-reveal :style="{ transitionDelay: `${index * 60}ms` }">
    <p class="member-name">{{ member.fullName }}</p>
    <p class="member-id">{{ member.id }}</p>
    <span class="role-tag">{{ member.role }}</span>
    <a
      v-if="member.gitLink"
      :href="member.gitLink"
      class="member-git"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.02 3.3 9.28 7.86 10.78.57.1.78-.25.78-.55v-2.1c-3.2.7-3.86-1.4-3.86-1.4-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.72-1.53-2.55-.3-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.3-.52-1.5.1-3.12 0 0 .97-.3 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.48 3.17-1.18 3.17-1.18.63 1.62.23 2.82.1 3.12.74.8 1.18 1.83 1.18 3.08 0 4.4-2.69 5.37-5.25 5.66.42.37.78 1.08.78 2.18v3.23c0 .3.2.65.78.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
      </svg>
      GitHub
    </a>
  </div>
</template>

<style scoped>
.member-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform var(--dur) var(--ease), border-color var(--dur) var(--ease),
    opacity var(--dur) var(--ease);
}

.member-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-2);
}

.member-name {
  margin: 0;
  font-weight: 600;
}

.member-id {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.role-tag {
  align-self: flex-start;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 0.75rem;
  color: var(--accent-2);
}

.member-git {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.member-git:hover {
  color: var(--accent-2);
}
</style>
