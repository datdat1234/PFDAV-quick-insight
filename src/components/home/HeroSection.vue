<script setup>
import { site } from '../../data/site.config.js'
import { useReveal } from '../../composables/useReveal.js'

const { el } = useReveal()

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero section-band">
    <div class="container" ref="el" data-reveal>
      <h1>{{ site.course }}</h1>
      <p class="subtitle">{{ site.major }} · {{ site.university }}</p>
      <div class="hero-ctas">
        <button type="button" class="btn-primary" @click="scrollToProjects">View projects</button>
        <a
          :href="site.repoLink"
          class="btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repository
          <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: calc(var(--space) * 14);
  padding-bottom: calc(var(--space) * 14);
}

h1 {
  font-size: clamp(2.2rem, 5vw, 4rem);
  max-width: 20ch;
}

.subtitle {
  margin-top: 16px;
  color: var(--text-muted);
  font-size: 1.1rem;
}

.hero-ctas {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius);
  padding: 12px 22px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: transform var(--dur) var(--ease), border-color var(--dur) var(--ease);
}

.btn-primary {
  background: var(--accent);
  color: #1a0f0b;
  border: 1px solid var(--accent);
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.btn-secondary {
  background: none;
  border: 1px solid var(--border);
  color: var(--text);
}

.btn-secondary:hover {
  border-color: var(--accent-2);
  transform: translateY(-2px);
}
</style>
