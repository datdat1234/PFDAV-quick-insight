<script setup>
import { site } from '../../data/site.config.js'
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-row">
      <p>{{ site.course }} · Semester {{ site.semester }}, {{ site.year }}</p>
      <p>{{ site.group }}</p>
      <a
        :href="site.repoLink"
        class="underline-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Repository
        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
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
