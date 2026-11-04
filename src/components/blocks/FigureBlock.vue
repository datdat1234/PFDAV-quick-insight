<script setup>
import { ref } from 'vue'
import { asset } from '../../utils/asset.js'
import ExplanationBox from './ExplanationBox.vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  caption: { type: String, default: '' },
  explanation: { type: String, default: '' },
  explanationPosition: { type: String, default: 'right' },
})

const lightboxOpen = ref(false)
</script>

<template>
  <figure
    class="figure-block"
    :class="`explanation-${explanation ? explanationPosition : 'none'}`"
  >
    <div class="figure-visual">
      <button type="button" class="figure-trigger" @click="lightboxOpen = true">
        <img :src="asset(src)" :alt="alt" loading="lazy" />
      </button>
      <figcaption v-if="caption">{{ caption }}</figcaption>
    </div>

    <ExplanationBox v-if="explanation" :text="explanation" class="figure-explanation" />

    <div
      v-if="lightboxOpen"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="alt"
      @click="lightboxOpen = false"
    >
      <img :src="asset(src)" :alt="alt" />
      <button type="button" class="lightbox-close" @click="lightboxOpen = false">
        <span class="visually-hidden">Close</span>
        ✕
      </button>
    </div>
  </figure>
</template>

<style scoped>
.figure-block {
  margin: 0;
  display: grid;
  gap: 16px;
}

.figure-block.explanation-right {
  grid-template-columns: 3fr 2fr;
  align-items: start;
}

@media (max-width: 1024px) {
  .figure-block.explanation-right {
    grid-template-columns: 1fr;
  }
}

.figure-visual {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

.figure-trigger {
  background: none;
  border: none;
  padding: 0;
  width: 100%;
  cursor: zoom-in;
}

figcaption {
  margin-top: 10px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 15, 24, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 100;
}

.lightbox img {
  max-height: 90vh;
  max-width: 90vw;
  border-radius: var(--radius);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
</style>
