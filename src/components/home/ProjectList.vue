<script setup>
import { site } from '../../data/site.config.js'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section id="projects" class="section-band alt" aria-labelledby="projects-heading">
    <div class="container">
      <h2 id="projects-heading">Projects</h2>
      <div class="project-grid">
        <ProjectCard
          v-for="(project, idx) in site.projects"
          :key="project.slug"
          :project="project"
          :index="idx"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-size: 1.8rem;
  margin-bottom: 32px;
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
