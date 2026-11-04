<script setup>
import BlockEditor from './BlockEditor.vue'

const props = defineProps({
  section: { type: Object, required: true },
})

const emit = defineEmits(['remove', 'move-up', 'move-down'])

function addBlock(type) {
  const defaults = {
    text: { type: 'text', content: '' },
    metrics: { type: 'metrics', items: [{ label: '', value: '', hint: '' }] },
    table: {
      type: 'table',
      caption: '',
      columns: [{ key: 'col1', label: 'Column 1', align: 'left' }],
      rows: [],
      highlightBest: null,
    },
    figure: { type: 'figure', src: '', alt: '', caption: '', explanation: '', explanationPosition: 'right' },
    chart: {
      type: 'chart',
      chartType: 'bar',
      labels: [],
      datasets: [{ label: 'Series 1', data: [] }],
      caption: '',
      explanation: '',
      explanationPosition: 'right',
    },
  }
  props.section.blocks.push(defaults[type])
}

function removeBlock(idx) {
  props.section.blocks.splice(idx, 1)
}

function moveBlock(idx, dir) {
  const blocks = props.section.blocks
  const target = idx + dir
  if (target < 0 || target >= blocks.length) return
  ;[blocks[idx], blocks[target]] = [blocks[target], blocks[idx]]
}
</script>

<template>
  <div class="section-editor">
    <div class="section-head">
      <label>Section ID<input v-model="section.id" type="text" /></label>
      <label>Title<input v-model="section.title" type="text" /></label>
      <label class="checkbox-row">
        <input v-model="section.defaultOpen" type="checkbox" />
        Open by default
      </label>
      <div class="section-actions">
        <button type="button" title="Move up" @click="emit('move-up')">↑</button>
        <button type="button" title="Move down" @click="emit('move-down')">↓</button>
        <button type="button" class="btn-remove" @click="emit('remove')">Remove section</button>
      </div>
    </div>

    <div class="blocks-list">
      <BlockEditor
        v-for="(block, idx) in section.blocks"
        :key="idx"
        :block="block"
        @remove="removeBlock(idx)"
        @move-up="moveBlock(idx, -1)"
        @move-down="moveBlock(idx, 1)"
      />
    </div>

    <div class="add-block-row">
      <span>Add block:</span>
      <button type="button" @click="addBlock('text')">+ Text</button>
      <button type="button" @click="addBlock('metrics')">+ Metrics</button>
      <button type="button" @click="addBlock('table')">+ Table</button>
      <button type="button" @click="addBlock('figure')">+ Figure</button>
      <button type="button" @click="addBlock('chart')">+ Chart</button>
    </div>
  </div>
</template>

<style scoped>
.section-editor {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-head {
  display: flex;
  gap: 14px;
  align-items: end;
  flex-wrap: wrap;
}

.section-head label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.section-head input[type='text'] {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 7px 10px;
  font-size: 0.88rem;
}

.checkbox-row {
  flex-direction: row;
  align-items: center;
  gap: 6px;
}

.section-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.section-actions button {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 6px 10px;
  font-size: 0.8rem;
}

.btn-remove {
  color: var(--accent);
}

.blocks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.add-block-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.add-block-row button {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 6px 12px;
  font-size: 0.82rem;
}

.add-block-row button:hover {
  border-color: var(--accent-2);
}
</style>
