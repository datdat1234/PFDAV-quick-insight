<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
})

const emit = defineEmits(['remove', 'move-up', 'move-down'])

const BLOCK_TYPES = ['text', 'metrics', 'table', 'figure', 'chart']
const CHART_TYPES = ['bar', 'line', 'pie', 'doughnut', 'scatter', 'radar']
const ALIGNS = ['left', 'center', 'right']

function defaultBlock(type) {
  switch (type) {
    case 'text':
      return { type: 'text', content: '' }
    case 'metrics':
      return { type: 'metrics', items: [{ label: '', value: '', hint: '' }] }
    case 'table':
      return {
        type: 'table',
        caption: '',
        columns: [{ key: 'col1', label: 'Column 1', align: 'left' }],
        rows: [],
        highlightBest: null,
      }
    case 'figure':
      return { type: 'figure', src: '', alt: '', caption: '', explanation: '', explanationPosition: 'right' }
    case 'chart':
      return {
        type: 'chart',
        chartType: 'bar',
        labels: [],
        datasets: [{ label: 'Series 1', data: [] }],
        caption: '',
        explanation: '',
        explanationPosition: 'right',
      }
    default:
      return { type: 'text', content: '' }
  }
}

function changeType(newType) {
  if (newType === props.block.type) return
  const fresh = defaultBlock(newType)
  Object.keys(props.block).forEach((k) => delete props.block[k])
  Object.assign(props.block, fresh)
}

// --- metrics ---
function addMetricItem() {
  props.block.items.push({ label: '', value: '', hint: '' })
}
function removeMetricItem(idx) {
  props.block.items.splice(idx, 1)
}

// --- table ---
function addColumn() {
  const n = props.block.columns.length + 1
  const key = `col${n}`
  props.block.columns.push({ key, label: `Column ${n}`, align: 'left' })
  props.block.rows.forEach((row) => {
    row[key] = ''
  })
}
function removeColumn(idx) {
  const { key } = props.block.columns[idx]
  props.block.columns.splice(idx, 1)
  props.block.rows.forEach((row) => delete row[key])
  if (props.block.highlightBest?.key === key) props.block.highlightBest = null
}
function addRow() {
  const row = {}
  props.block.columns.forEach((c) => {
    row[c.key] = ''
  })
  props.block.rows.push(row)
}
function removeRow(idx) {
  props.block.rows.splice(idx, 1)
}
const highlightEnabled = computed({
  get: () => !!props.block.highlightBest,
  set: (val) => {
    props.block.highlightBest = val ? { key: props.block.columns[0]?.key ?? '', mode: 'max' } : null
  },
})

// --- chart: comma-separated <-> array helpers ---
function listToText(arr) {
  return (arr || []).join(', ')
}
function textToList(text) {
  return text
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}
const labelsText = computed({
  get: () => listToText(props.block.labels),
  set: (val) => {
    props.block.labels = textToList(val)
  },
})

function datasetDataText(ds) {
  return (ds.data || []).join(', ')
}
function setDatasetData(ds, text) {
  ds.data = textToList(text).map((n) => (Number.isNaN(Number(n)) ? n : Number(n)))
}
function addDataset() {
  props.block.datasets.push({ label: `Series ${props.block.datasets.length + 1}`, data: [] })
}
function removeDataset(idx) {
  props.block.datasets.splice(idx, 1)
}
</script>

<template>
  <div class="block-editor">
    <div class="block-head">
      <label class="type-select">
        Block type
        <select :value="block.type" @change="changeType($event.target.value)">
          <option v-for="t in BLOCK_TYPES" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>
      <div class="block-actions">
        <button type="button" title="Move up" @click="emit('move-up')">↑</button>
        <button type="button" title="Move down" @click="emit('move-down')">↓</button>
        <button type="button" class="btn-remove" @click="emit('remove')">Remove block</button>
      </div>
    </div>

    <!-- text -->
    <div v-if="block.type === 'text'" class="block-fields">
      <label>
        Content
        <textarea v-model="block.content" rows="3" placeholder="Supports **bold**, *italic*, `code`"></textarea>
      </label>
    </div>

    <!-- metrics -->
    <div v-else-if="block.type === 'metrics'" class="block-fields">
      <div v-for="(item, idx) in block.items" :key="idx" class="metric-item-row">
        <label>Label<input v-model="item.label" type="text" /></label>
        <label>Value<input v-model="item.value" type="text" /></label>
        <label>Hint<input v-model="item.hint" type="text" /></label>
        <button type="button" class="btn-remove" @click="removeMetricItem(idx)">Remove</button>
      </div>
      <button type="button" class="btn-add" @click="addMetricItem">+ Add metric</button>
    </div>

    <!-- table -->
    <div v-else-if="block.type === 'table'" class="block-fields">
      <label>Caption<input v-model="block.caption" type="text" /></label>

      <p class="subhead">Columns</p>
      <div v-for="(col, idx) in block.columns" :key="idx" class="column-row">
        <label>Key<input v-model="col.key" type="text" /></label>
        <label>Label<input v-model="col.label" type="text" /></label>
        <label>
          Align
          <select v-model="col.align">
            <option v-for="a in ALIGNS" :key="a" :value="a">{{ a }}</option>
          </select>
        </label>
        <button type="button" class="btn-remove" @click="removeColumn(idx)">Remove</button>
      </div>
      <button type="button" class="btn-add" @click="addColumn">+ Add column</button>

      <p class="subhead">Rows</p>
      <div v-for="(row, rIdx) in block.rows" :key="rIdx" class="table-row-editor">
        <label v-for="col in block.columns" :key="col.key">
          {{ col.label }}
          <input v-model="row[col.key]" type="text" />
        </label>
        <button type="button" class="btn-remove" @click="removeRow(rIdx)">Remove row</button>
      </div>
      <button type="button" class="btn-add" @click="addRow">+ Add row</button>

      <label class="checkbox-row">
        <input v-model="highlightEnabled" type="checkbox" />
        Highlight best value in a column
      </label>
      <div v-if="block.highlightBest" class="highlight-config">
        <label>
          Column
          <select v-model="block.highlightBest.key">
            <option v-for="col in block.columns" :key="col.key" :value="col.key">{{ col.label }}</option>
          </select>
        </label>
        <label>
          Mode
          <select v-model="block.highlightBest.mode">
            <option value="max">max</option>
            <option value="min">min</option>
          </select>
        </label>
      </div>
    </div>

    <!-- figure -->
    <div v-else-if="block.type === 'figure'" class="block-fields">
      <label>Image path (under public/)<input v-model="block.src" type="text" placeholder="figures/my-figure.svg" /></label>
      <label>Alt text<input v-model="block.alt" type="text" /></label>
      <label>Caption<input v-model="block.caption" type="text" /></label>
      <label>Explanation<textarea v-model="block.explanation" rows="2"></textarea></label>
      <label>
        Explanation position
        <select v-model="block.explanationPosition">
          <option value="right">right</option>
          <option value="below">below</option>
        </select>
      </label>
    </div>

    <!-- chart -->
    <div v-else-if="block.type === 'chart'" class="block-fields">
      <label>
        Chart type
        <select v-model="block.chartType">
          <option v-for="t in CHART_TYPES" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>
      <label>Labels (comma-separated)<input v-model="labelsText" type="text" /></label>

      <p class="subhead">Datasets</p>
      <div v-for="(ds, idx) in block.datasets" :key="idx" class="dataset-row">
        <label>Series label<input v-model="ds.label" type="text" /></label>
        <label>
          Data (comma-separated numbers)
          <input :value="datasetDataText(ds)" type="text" @change="setDatasetData(ds, $event.target.value)" />
        </label>
        <button type="button" class="btn-remove" @click="removeDataset(idx)">Remove series</button>
      </div>
      <button type="button" class="btn-add" @click="addDataset">+ Add series</button>

      <label>Caption<input v-model="block.caption" type="text" /></label>
      <label>Explanation<textarea v-model="block.explanation" rows="2"></textarea></label>
      <label>
        Explanation position
        <select v-model="block.explanationPosition">
          <option value="right">right</option>
          <option value="below">below</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
.block-editor {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  background: var(--surface-2);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.block-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;
}

.type-select {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.block-actions {
  display: flex;
  gap: 8px;
}

.block-actions button {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 6px 10px;
  font-size: 0.8rem;
}

.block-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.subhead {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  margin: 6px 0 0;
}

label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.82rem;
  color: var(--text-muted);
}

input,
select,
textarea {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 7px 10px;
  font-size: 0.88rem;
  font-family: inherit;
}

.metric-item-row,
.column-row,
.dataset-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 10px;
  align-items: end;
}

.table-row-editor {
  display: flex;
  gap: 10px;
  align-items: end;
  flex-wrap: wrap;
}

.table-row-editor label {
  min-width: 100px;
}

.checkbox-row {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.highlight-config {
  display: flex;
  gap: 12px;
}

.btn-add,
.btn-remove {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 6px 12px;
  font-size: 0.8rem;
  height: fit-content;
}

.btn-remove {
  color: var(--accent);
}
</style>
