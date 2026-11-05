<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { site } from '../../data/site.config.js'

const scrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()
const router = useRouter()

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function goHomeAnchor(hash) {
  menuOpen.value = false
  if (route.name === 'home') {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  router.push({ path: '/PFDAV-quick-insight/', hash })
}
</script>

<template>
  <header class="app-header" :class="{ scrolled }">
    <div class="container header-row">
      <router-link to="/PFDAV-quick-insight/" class="group-name">{{ site.group }}</router-link>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="header-nav"
        @click="menuOpen = !menuOpen"
      >
        <span class="visually-hidden">Toggle menu</span>
        <span aria-hidden="true">☰</span>
      </button>

      <nav id="header-nav" class="header-nav" :class="{ open: menuOpen }" aria-label="Primary">
        <a href="#course" class="underline-link" @click.prevent="goHomeAnchor('#course')">Course</a>
        <a href="#group" class="underline-link" @click.prevent="goHomeAnchor('#group')">Group</a>
        <a href="#projects" class="underline-link" @click.prevent="goHomeAnchor('#projects')">Projects</a>
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
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid transparent;
  transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease);
}

.app-header.scrolled {
  background: rgba(14, 23, 38, 0.82);
  backdrop-filter: blur(10px);
  border-bottom-color: var(--border);
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.group-name {
  font-weight: 600;
  color: var(--text);
}

.header-nav {
  display: flex;
  gap: 28px;
  align-items: center;
}

.header-nav a {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  width: 38px;
  height: 38px;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .header-nav {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--dur) var(--ease);
  }

  .header-nav.open {
    max-height: 240px;
  }

  .header-nav a {
    padding: 14px 24px;
    width: 100%;
  }
}
</style>
