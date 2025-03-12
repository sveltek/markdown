export interface HighlightData {
  lang: string | undefined
  meta: string | undefined
  code: string | undefined
}

export type Highlighter = (
  data: HighlightData,
) => Promise<string | undefined> | string | undefined

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
}
