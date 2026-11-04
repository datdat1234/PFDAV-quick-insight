<script setup>
import { site } from '../../data/site.config.js'
import MemberCard from './MemberCard.vue'
</script>

<template>
  <section id="team" class="section-band" aria-labelledby="team-heading">
    <div class="container">
      <h2 id="team-heading">{{ site.group }}</h2>
      <div class="member-grid">
        <MemberCard
          v-for="(member, idx) in site.members"
          :key="member.id"
          :member="member"
          :index="idx"
        />
      </div>
      <a
        :href="site.repoLink"
        class="repo-link underline-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View project repository
        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-size: 1.8rem;
  margin-bottom: 32px;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .member-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .member-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .member-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.repo-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 28px;
  font-weight: 500;
  color: var(--accent-2);
}
</style>
