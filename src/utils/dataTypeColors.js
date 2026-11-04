export const DATA_TYPE_COLORS = {
  Tabular: 'var(--chart-1)',
  Text: 'var(--chart-2)',
  Image: 'var(--chart-3)',
  'Time series': 'var(--chart-4)',
  Audio: 'var(--chart-5)',
  Graph: 'var(--chart-6)',
}

export function dataTypeColor(type) {
  return DATA_TYPE_COLORS[type] || 'var(--accent-2)'
}
