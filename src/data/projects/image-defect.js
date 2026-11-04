/** @typedef {import('../projectTypes.js').Project} Project */

/** @type {Project} */
export const project = {
  slug: 'image-defect',
  title: 'Visual Defect Detection on Manufacturing Parts',
  dataType: 'Image',
  summary:
    'A CNN-based classifier that flags surface defects on manufactured parts from camera images, built for a quality-control inspection line.',
  problem:
    'A manufacturing line needs automated visual inspection to catch surface defects (scratches, dents, discoloration) that manual spot-checks miss at full production speed.',
  dataset:
    'Public industrial defect dataset: ~3,600 labeled part images across 6 defect classes plus "no defect", 256x256 resolution. License: CC BY-NC 4.0.',
  notebook: { github: 'https://github.com/hao456c/report-something-for-somebody/tree/main/notebooks/image-defect.ipynb', colab: '' },
  reportPdf: '',
  youtube: '',
  sections: [
    {
      id: 'eda',
      title: 'Exploratory Data Analysis',
      defaultOpen: true,
      blocks: [
        {
          type: 'text',
          content:
            'Class imbalance is severe: the "no defect" class makes up 48% of images, while the rarest defect class ("discoloration") makes up only 4%. We inspected sample images per class to confirm label quality.',
        },
        {
          type: 'metrics',
          items: [
            { label: 'Images', value: '3,612' },
            { label: 'Classes', value: 7 },
            { label: 'Resolution', value: '256×256' },
            { label: 'Rarest class share', value: '4.1%' },
          ],
        },
        {
          type: 'figure',
          src: 'figures/image-defect-samples.svg',
          alt: 'Placeholder grid figure of sample part images per defect class',
          caption: 'Figure 1. Sample images per defect class (placeholder grid).',
          explanation:
            'Scratch and dent classes are visually similar under certain lighting, which later shows up as the main confusion-matrix error pair.',
          explanationPosition: 'below',
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
            'We fine-tuned a **ResNet-18** pretrained on ImageNet, replacing the final layer for 7-way classification. Class imbalance was addressed with weighted cross-entropy and on-the-fly augmentation (flips, rotation ±15°, color jitter).',
        },
        {
          type: 'table',
          caption: 'Table 1. Training configuration.',
          columns: [
            { key: 'param', label: 'Parameter', align: 'left' },
            { key: 'value', label: 'Value', align: 'right' },
          ],
          rows: [
            { param: 'Backbone', value: 'ResNet-18 (ImageNet pretrained)' },
            { param: 'Epochs', value: 25 },
            { param: 'Optimizer', value: 'AdamW' },
            { param: 'Learning rate', value: '3e-4' },
            { param: 'Augmentation', value: 'flip, rotate, color jitter' },
          ],
        },
      ],
    },
    {
      id: 'results',
      title: 'Results',
      blocks: [
        {
          type: 'metrics',
          items: [
            { label: 'Test accuracy', value: '91.3%' },
            { label: 'Macro F1', value: 0.88 },
            { label: 'Inference time', value: '14ms', hint: 'per image, GPU' },
            { label: 'Params', value: '11.2M' },
          ],
        },
        {
          type: 'chart',
          chartType: 'radar',
          labels: ['Scratch', 'Dent', 'Discoloration', 'Crack', 'Contamination', 'Deformation', 'No defect'],
          datasets: [{ label: 'Per-class F1', data: [0.84, 0.81, 0.79, 0.9, 0.88, 0.86, 0.96] }],
          caption: 'Figure 2. Per-class F1 score.',
          explanation:
            'The "no defect" class is easiest to classify, while "discoloration" lags due to limited training examples and lighting variability.',
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
            'The fine-tuned ResNet-18 reaches 91.3% accuracy at 14ms per image, comfortably within the line’s real-time budget. **Next steps**: collect more "discoloration" examples and evaluate a lighter backbone for edge deployment.',
        },
      ],
    },
  ],
}
