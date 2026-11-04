<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>

<template>
  <aside class="explanation-box">
    <p class="explanation-label">What this shows</p>
    <p class="explanation-text">{{ text }}</p>
  </aside>
</template>

<style scoped>
.explanation-box {
  background: var(--surface-2);
  border-left: 3px solid var(--accent-2);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 14px 18px;
}

.explanation-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.explanation-text {
  font-size: 0.92rem;
  color: var(--text);
}
</style>
