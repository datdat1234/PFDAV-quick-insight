<script setup>
defineProps({
  content: { type: String, required: true },
})

/** Minimal inline formatting: **bold**, *italic*, `code` — escapes HTML first. */
function renderInline(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}
</script>

<template>
  <p class="text-block" v-html="renderInline(content)"></p>
</template>

<style scoped>
.text-block {
  color: var(--text);
}

.text-block :deep(code) {
  background: var(--surface-2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
</style>
