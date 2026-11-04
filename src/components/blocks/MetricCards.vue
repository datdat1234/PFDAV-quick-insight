<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="metric-cards">
    <div v-for="item in items" :key="item.label" class="metric-card">
      <span class="metric-value">{{ item.value }}</span>
      <span class="metric-label">{{ item.label }}</span>
      <span v-if="item.hint" class="metric-hint">{{ item.hint }}</span>
    </div>
  </div>
</template>

<style scoped>
.metric-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.metric-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-value {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text);
}

.metric-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.metric-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  opacity: 0.8;
}
</style>
