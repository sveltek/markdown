import type { Highlighter, HighlightOptions } from '@/plugins/types'

export interface Highlight {
  /**
   * Specifies custom syntax highlighter.
   *
   * @example
   *
   * ```ts
   * svelteMarkdown({
   *   highlight: {
   *     highlighter: async ({ lang, meta, code }) => {
   *       return code
   *     }
   *   }
   * })
   * ```
   *
   * @default undefined
   */
  highlighter?: Highlighter
  /**
   * Specifies custom options for the `root` node (usually the `<pre>` tag).
   *
   * @example
   *
   * ```ts
   * svelteMarkdown({
   *   highlight: {
   *     root: (node) => {
   *       node.tagName = 'div'
   *       node.properties.id = 'code-highlight'
   *       // ...
   *     }
   *   }
   * })
   * ```
   *
   * @default undefined
   */
  root?: HighlightOptions['root']
}
