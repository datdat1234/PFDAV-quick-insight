<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  defaultOpen: { type: Boolean, default: false },
})

const storageKey = `section-open:${props.id}`
const open = ref(props.defaultOpen)

onMounted(() => {
  try {
    const saved = sessionStorage.getItem(storageKey)
    if (saved !== null) open.value = saved === '1'
  } catch {
    /* sessionStorage unavailable */
  }
})

watch(open, (val) => {
  try {
    sessionStorage.setItem(storageKey, val ? '1' : '0')
  } catch {
    /* sessionStorage unavailable */
  }
})

function toggle() {
  open.value = !open.value
}

function setOpen(val) {
  open.value = val
}

defineExpose({ setOpen })
</script>

<template>
  <section class="collapsible-section" :id="id" :aria-labelledby="`${id}-heading`">
    <h3 :id="`${id}-heading`">
      <button
        type="button"
        class="section-toggle"
        :aria-expanded="open"
        :aria-controls="`${id}-panel`"
        @click="toggle"
      >
        <span>{{ title }}</span>
        <svg
          class="chevron"
          :class="{ open }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </h3>
    <div
      :id="`${id}-panel`"
      class="section-panel"
      :class="{ open }"
      role="region"
    >
      <div class="section-panel-inner">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.collapsible-section {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
}

h3 {
  margin: 0;
}

.section-toggle {
  width: 100%;
  background: none;
  border: none;
  color: var(--text);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.05rem;
  font-weight: 600;
  text-align: left;
}

.chevron {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: transform var(--dur) var(--ease);
}

.chevron.open {
  transform: rotate(180deg);
}

.section-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 250ms var(--ease);
}

.section-panel.open {
  /* High enough that even a long admin editor panel (many sections/blocks) never gets clipped. */
  max-height: 100000px;
}

.section-panel-inner {
  padding: 0 20px 20px;
}
</style>
