<script setup>
defineProps({
  href: { type: String, default: '' },
  label: { type: String, required: true },
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="link-button"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ label }}
    <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  </a>
  <span v-else class="link-button is-disabled" aria-disabled="true">
    {{ label }} — Coming soon
  </span>
</template>

<style scoped>
.link-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 9px 16px;
  font-size: 0.9rem;
  transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease);
}

a.link-button:hover {
  border-color: var(--accent-2);
  transform: translateY(-2px);
}

.link-button.is-disabled {
  color: var(--text-muted);
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
