/** Shared JSDoc types for project data. Imported for type hints only — no runtime exports. */

/** @typedef {{ fullName:string, id:string, role:string, gitLink:string }} Member */
/** @typedef {{ github?:string, colab?:string }} NotebookLinks */
/**
 * @typedef {(
 *  | { type:'text', content:string }
 *  | { type:'metrics', items:{ label:string, value:string|number, hint?:string }[] }
 *  | { type:'table', caption?:string, columns:{ key:string, label:string, align?:'left'|'right'|'center' }[],
 *      rows:Record<string,string|number>[], highlightBest?:{ key:string, mode:'max'|'min' } }
 *  | { type:'figure', src:string, alt:string, caption?:string, explanation?:string, explanationPosition?:'right'|'below' }
 *  | { type:'chart', chartType:'bar'|'line'|'pie'|'doughnut'|'scatter'|'radar',
 *      labels?:string[], datasets:{ label:string, data:any[] }[], options?:object,
 *      caption?:string, explanation?:string, explanationPosition?:'right'|'below' }
 * )} Block
 */
/** @typedef {{ id:string, title:string, defaultOpen?:boolean, blocks:Block[] }} Section */
/**
 * @typedef {{
 *  slug:string, title:string, dataType:string, summary:string,
 *  problem:string, dataset:string,
 *  notebook:NotebookLinks, reportPdf:string, youtube:string,
 *  sections:Section[]
 * }} Project
 */

export {}
