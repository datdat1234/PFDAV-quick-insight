<script setup>
import TextBlock from './TextBlock.vue'
import MetricCards from './MetricCards.vue'
import DataTable from './DataTable.vue'
import FigureBlock from './FigureBlock.vue'
import ChartBlock from './ChartBlock.vue'

defineProps({
  blocks: { type: Array, required: true },
})
</script>

<template>
  <div class="section-renderer">
    <template v-for="(block, idx) in blocks" :key="idx">
      <TextBlock v-if="block.type === 'text'" :content="block.content" />
      <MetricCards v-else-if="block.type === 'metrics'" :items="block.items" />
      <DataTable
        v-else-if="block.type === 'table'"
        :caption="block.caption"
        :columns="block.columns"
        :rows="block.rows"
        :highlight-best="block.highlightBest"
      />
      <FigureBlock
        v-else-if="block.type === 'figure'"
        :src="block.src"
        :alt="block.alt"
        :caption="block.caption"
        :explanation="block.explanation"
        :explanation-position="block.explanationPosition"
      />
      <ChartBlock
        v-else-if="block.type === 'chart'"
        :chart-type="block.chartType"
        :labels="block.labels"
        :datasets="block.datasets"
        :options="block.options"
        :caption="block.caption"
        :explanation="block.explanation"
        :explanation-position="block.explanationPosition"
      />
    </template>
  </div>
</template>

<style scoped>
.section-renderer {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
