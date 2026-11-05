<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({ path: '/PFDAV-quick-insight/', hash: '#projects' })
}
</script>

<template>
  <button type="button" class="back-button" @click="goHome">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" width="18" height="18">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    Back to home
  </button>
</template>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 8px 14px;
  font-size: 0.9rem;
  transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease);
}

.back-button:hover {
  border-color: var(--accent-2);
  transform: translateX(-2px);
}
</style>
