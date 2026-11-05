<script setup>
import { site } from '../../data/site.config.js'
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-row">
      <p>{{ site.group }}</p>
      <p>{{ site.semester }} · {{ site.year }}</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  justify-content: space-between;
  align-items: center;
}
</style>
