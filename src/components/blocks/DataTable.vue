<script setup>
import { computed } from 'vue'

const props = defineProps({
  caption: { type: String, default: '' },
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  highlightBest: { type: Object, default: null },
})

const bestRowIndex = computed(() => {
  if (!props.highlightBest) return -1
  const { key, mode } = props.highlightBest
  let bestIdx = -1
  let bestVal = mode === 'max' ? -Infinity : Infinity
  props.rows.forEach((row, idx) => {
    const val = parseFloat(row[key])
    if (Number.isNaN(val)) return
    if ((mode === 'max' && val > bestVal) || (mode === 'min' && val < bestVal)) {
      bestVal = val
      bestIdx = idx
    }
  })
  return bestIdx
})
</script>

<template>
  <div class="data-table-wrap">
    <table class="data-table">
      <caption v-if="caption">{{ caption }}</caption>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{ textAlign: col.align || 'left' }"
            scope="col"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, idx) in rows"
          :key="idx"
          :class="{ 'is-best': idx === bestRowIndex }"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :style="{ textAlign: col.align || 'left' }"
          >
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.data-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.data-table caption {
  text-align: left;
  padding: 12px 16px;
  color: var(--text-muted);
  font-size: 0.85rem;
  border-bottom: 1px solid var(--border);
}

.data-table th,
.data-table td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.data-table th {
  background: var(--surface-2);
  color: var(--text-muted);
  font-weight: 600;
}

.data-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.015);
}

.data-table tr.is-best td {
  color: var(--success);
  font-weight: 600;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
