/** @typedef {import('../projectTypes.js').Project} Project */

/** @type {Project} */
export const project = {
  slug: 'tabular-churn',
  title: 'Predicting Customer Churn from Tabular Data',
  dataType: 'Tabular',
  summary:
    'A gradient-boosted model that predicts subscription churn from account, usage, and billing features, benchmarked against a logistic-regression baseline.',
  problem:
    'A telecom provider wants to flag subscribers at high risk of churn 30 days in advance so retention offers can be targeted efficiently.',
  dataset:
    'Public telecom churn dataset: ~7,000 customer records, 20 features (contract type, tenure, monthly charges, support tickets), binary churn label. License: CC BY 4.0.',
  notebook: { github: 'https://github.com/hao456c/report-something-for-somebody/tree/main/notebooks/tabular-churn.ipynb', colab: '' },
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
            'We examined class balance, missing values, and correlations between usage features and churn. **Contract length** and **monthly charges** showed the strongest univariate association with churn.',
        },
        {
          type: 'metrics',
          items: [
            { label: 'Rows', value: '7,043', hint: 'after dedup' },
            { label: 'Churn rate', value: '26.5%' },
            { label: 'Missing values', value: '0.15%', hint: 'TotalCharges only' },
            { label: 'Features', value: 20 },
          ],
        },
        {
          type: 'figure',
          src: 'figures/tabular-churn-distribution.svg',
          alt: 'Bar chart placeholder showing churn distribution by contract type',
          caption: 'Figure 1. Churn rate by contract type.',
          explanation:
            'Month-to-month contracts churn at roughly three times the rate of one- and two-year contracts, suggesting contract length as a strong candidate feature.',
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
            'We trained a **LightGBM** classifier with stratified 5-fold cross-validation, comparing it against a logistic-regression baseline with L2 regularization. Categorical features were target-encoded; numeric features were scaled for the baseline only.',
        },
        {
          type: 'table',
          caption: 'Table 1. Hyperparameter search space.',
          columns: [
            { key: 'param', label: 'Parameter', align: 'left' },
            { key: 'range', label: 'Search range', align: 'left' },
            { key: 'chosen', label: 'Chosen value', align: 'right' },
          ],
          rows: [
            { param: 'num_leaves', range: '16 – 128', chosen: 64 },
            { param: 'learning_rate', range: '0.01 – 0.2', chosen: 0.05 },
            { param: 'n_estimators', range: '100 – 800', chosen: 400 },
            { param: 'max_depth', range: '3 – 12', chosen: 7 },
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
          caption: 'Table 2. Test-set performance comparison.',
          columns: [
            { key: 'model', label: 'Model', align: 'left' },
            { key: 'accuracy', label: 'Accuracy', align: 'right' },
            { key: 'f1', label: 'F1 score', align: 'right' },
            { key: 'auc', label: 'ROC-AUC', align: 'right' },
          ],
          rows: [
            { model: 'Logistic Regression', accuracy: '79.2%', f1: 0.61, auc: 0.83 },
            { model: 'LightGBM', accuracy: '84.6%', f1: 0.69, auc: 0.89 },
          ],
          highlightBest: { key: 'auc', mode: 'max' },
        },
        {
          type: 'chart',
          chartType: 'bar',
          labels: ['Tenure', 'Monthly charges', 'Contract type', 'Support tickets', 'Internet service'],
          datasets: [{ label: 'Feature importance', data: [0.28, 0.24, 0.19, 0.15, 0.09] }],
          caption: 'Figure 2. Top-5 feature importances (LightGBM, gain).',
          explanation:
            'Tenure and monthly charges together account for over half of total gain, confirming the EDA signal around contract economics and customer lifetime.',
          explanationPosition: 'below',
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
            'The LightGBM model improves ROC-AUC by 6 points over the baseline and would let the retention team target roughly 2x more true churners at the same outreach budget. **Next steps**: calibrate probabilities for cost-sensitive thresholding and monitor for feature drift in production.',
        },
      ],
    },
  ],
}
