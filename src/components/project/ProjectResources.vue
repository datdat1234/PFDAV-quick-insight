<script setup>
import LinkButton from '../blocks/LinkButton.vue'
import YouTubeEmbed from './YouTubeEmbed.vue'
import { asset } from '../../utils/asset.js'

const props = defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <div class="project-resources">
    <div class="resource-buttons">
      <LinkButton :href="project.notebook?.github" label="Notebook (GitHub)" />
      <LinkButton :href="project.notebook?.colab" label="Open in Colab" />
      <LinkButton :href="project.reportPdf ? asset(project.reportPdf) : ''" label="PDF report" />
      <LinkButton :href="project.youtube" label="YouTube video" />
    </div>
    <YouTubeEmbed :youtube="project.youtube" />
  </div>
</template>

<style scoped>
.project-resources {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.resource-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
