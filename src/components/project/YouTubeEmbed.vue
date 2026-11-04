<script setup>
import { computed } from 'vue'
import { youtubeId } from '../../utils/asset.js'

const props = defineProps({
  youtube: { type: String, default: '' },
})

const id = computed(() => youtubeId(props.youtube))
</script>

<template>
  <div v-if="id" class="youtube-embed">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${id}`"
      title="Project video"
      loading="lazy"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.youtube-embed {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}

.youtube-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
