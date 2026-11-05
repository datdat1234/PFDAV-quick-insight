<script setup>
import { site } from '../../data/site.config.js'
import { useReveal } from '../../composables/useReveal.js'

const { el } = useReveal()
</script>

<template>
  <section id="course" class="section-band alt" aria-labelledby="course-heading">
    <div class="container" ref="el" data-reveal>
      <h2 id="course-heading">Course information</h2>
      <dl class="info-grid">
        <div class="info-item">
          <dt>University</dt>
          <dd>{{ site.university }}</dd>
        </div>
        <div class="info-item">
          <dt>Faculty / Major</dt>
          <dd>{{ site.major }}</dd>
        </div>
        <div class="info-item">
          <dt>Course</dt>
          <dd>{{ site.course }}</dd>
        </div>
        <div class="info-item">
          <dt>Year</dt>
          <dd>{{ site.year }}</dd>
        </div>
        <div class="info-item">
          <dt>Semester</dt>
          <dd>{{ site.semester }}</dd>
        </div>
        <div class="info-item">
          <dt>Lecturer</dt>
          <dd>{{ site.teacher }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-size: 1.8rem;
  margin-bottom: 32px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin: 0;
}

.info-item {
  border-top: 1px solid var(--border);
  padding-top: 12px;
}

dt {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

dd {
  margin: 0;
  font-size: 1.05rem;
}
</style>
