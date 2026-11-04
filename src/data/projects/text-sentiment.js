/** @typedef {import('../projectTypes.js').Project} Project */

/** @type {Project} */
export const project = {
  slug: 'text-sentiment',
  title: 'Sentiment Classification of Product Reviews',
  dataType: 'Text',
  summary:
    'A fine-tuned transformer classifier that labels product reviews as positive, neutral, or negative, compared against a classic TF-IDF + SVM pipeline.',
  problem:
    'An e-commerce platform needs automated sentiment tagging of incoming reviews to prioritize customer-support follow-up and surface product issues early.',
  dataset:
    'Public product review corpus: ~25,000 English-language reviews with 3-class sentiment labels, scraped and anonymized. License: research use only.',
  notebook: { github: 'https://github.com/hao456c/report-something-for-somebody/tree/main/notebooks/text-sentiment.ipynb', colab: 'https://colab.research.google.com/drive/placeholder-text-sentiment' },
  reportPdf: '',
  youtube: 'https://youtu.be/dQw4w9WgXcQ',
  sections: [
    {
      id: 'eda',
      title: 'Exploratory Data Analysis',
      defaultOpen: true,
      blocks: [
        {
          type: 'text',
          content:
            'Review length and vocabulary richness vary considerably by sentiment class. Negative reviews are on average **40% longer** than positive ones, often detailing specific complaints.',
        },
        {
          type: 'metrics',
          items: [
            { label: 'Reviews', value: '24,812' },
            { label: 'Avg. tokens', value: 86 },
            { label: 'Vocabulary size', value: '31.2k' },
            { label: 'Class balance', value: '52/31/17', hint: 'pos/neu/neg %' },
          ],
        },
        {
          type: 'figure',
          src: 'figures/text-sentiment-wordcloud.svg',
          alt: 'Placeholder word-cloud figure of frequent terms per sentiment class',
          caption: 'Figure 1. Frequent terms by sentiment class (placeholder word cloud).',
          explanation:
            'Positive reviews cluster around words like "fast" and "quality"; negative reviews cluster around "refund" and "broken", guiding feature inspection for the linear baseline.',
          explanationPosition: 'right',
        },
      ],
    },
    {
      id: 'method',
      title: 'Methodology',
      blocks: [
        {
          type: 'text',
          content:
            'Baseline: TF-IDF (1–2 grams, 20k vocab) + linear SVM. Main model: **DistilBERT** fine-tuned for 3 epochs with a linear learning-rate warmup and early stopping on validation macro-F1.',
        },
        {
          type: 'table',
          caption: 'Table 1. Fine-tuning configuration.',
          columns: [
            { key: 'param', label: 'Parameter', align: 'left' },
            { key: 'value', label: 'Value', align: 'right' },
          ],
          rows: [
            { param: 'Base model', value: 'distilbert-base-uncased' },
            { param: 'Epochs', value: 3 },
            { param: 'Batch size', value: 32 },
            { param: 'Learning rate', value: '2e-5' },
            { param: 'Max sequence length', value: 128 },
          ],
        },
      ],
    },
    {
      id: 'results',
      title: 'Results',
      blocks: [
        {
          type: 'table',
          caption: 'Table 2. Macro-averaged test metrics.',
          columns: [
            { key: 'model', label: 'Model', align: 'left' },
            { key: 'precision', label: 'Precision', align: 'right' },
            { key: 'recall', label: 'Recall', align: 'right' },
            { key: 'f1', label: 'F1', align: 'right' },
          ],
          rows: [
            { model: 'TF-IDF + SVM', precision: 0.74, recall: 0.71, f1: 0.72 },
            { model: 'DistilBERT', precision: 0.85, recall: 0.84, f1: 0.84 },
          ],
          highlightBest: { key: 'f1', mode: 'max' },
        },
        {
          type: 'chart',
          chartType: 'line',
          labels: ['Epoch 1', 'Epoch 2', 'Epoch 3'],
          datasets: [
            { label: 'Train loss', data: [0.61, 0.34, 0.21] },
            { label: 'Validation loss', data: [0.58, 0.39, 0.33] },
          ],
          caption: 'Figure 2. Training and validation loss per epoch.',
          explanation:
            'Validation loss plateaus after epoch 2 while training loss keeps dropping, indicating mild overfitting — this motivated early stopping at epoch 3.',
          explanationPosition: 'right',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      blocks: [
        {
          type: 'text',
          content:
            'DistilBERT outperforms the linear baseline by 12 F1 points, mainly on neutral reviews where lexical overlap with positive/negative classes confuses the SVM. **Next steps**: distill further for latency-sensitive serving and add active-learning for ambiguous cases.',
        },
      ],
    },
  ],
}
