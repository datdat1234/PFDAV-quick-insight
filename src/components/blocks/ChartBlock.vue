<script setup>
import { computed } from 'vue'
import { Bar, Line, Pie, Doughnut, Scatter, Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
} from 'chart.js'
import ExplanationBox from './ExplanationBox.vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
)

ChartJS.defaults.color = '#a3b1c6'
ChartJS.defaults.borderColor = '#2a3a55'
ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif'

const props = defineProps({
  chartType: { type: String, required: true },
  labels: { type: Array, default: () => [] },
  datasets: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  caption: { type: String, default: '' },
  explanation: { type: String, default: '' },
  explanationPosition: { type: String, default: 'right' },
})

const PALETTE = ['#6fa8c9', '#e4735c', '#9bb48a', '#c9a86a', '#9a8fc4', '#7aa6a0']

const componentMap = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
  scatter: Scatter,
  radar: Radar,
}

const chartComponent = computed(() => componentMap[props.chartType] || Bar)

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds, i) => ({
    ...ds,
    backgroundColor: ds.backgroundColor || PALETTE[i % PALETTE.length],
    borderColor: ds.borderColor || PALETTE[i % PALETTE.length],
    tension: props.chartType === 'line' ? 0.3 : undefined,
  })),
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#a3b1c6' } },
  },
  scales:
    props.chartType === 'pie' || props.chartType === 'doughnut' || props.chartType === 'radar'
      ? undefined
      : {
          x: { grid: { color: '#2a3a55' }, ticks: { color: '#a3b1c6' } },
          y: { grid: { color: '#2a3a55' }, ticks: { color: '#a3b1c6' } },
        },
  ...props.options,
}))
</script>

<template>
  <figure
    class="chart-block"
    :class="`explanation-${explanation ? explanationPosition : 'none'}`"
  >
    <div class="chart-visual">
      <div class="chart-canvas-wrap">
        <component :is="chartComponent" :data="chartData" :options="chartOptions" />
      </div>
      <figcaption v-if="caption">{{ caption }}</figcaption>
    </div>

    <ExplanationBox v-if="explanation" :text="explanation" class="chart-explanation" />
  </figure>
</template>

<style scoped>
.chart-block {
  margin: 0;
  display: grid;
  gap: 16px;
}

.chart-block.explanation-right {
  grid-template-columns: 3fr 2fr;
  align-items: start;
}

@media (max-width: 1024px) {
  .chart-block.explanation-right {
    grid-template-columns: 1fr;
  }
}

.chart-visual {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

.chart-canvas-wrap {
  position: relative;
  height: 280px;
}

figcaption {
  margin-top: 10px;
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
