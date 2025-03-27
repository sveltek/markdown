export interface HighlighterData {
  lang: string | undefined
  meta: string | undefined
  code: string | undefined
}

export type Highlighter = (
  data: HighlighterData,
) => Promise<string | undefined> | string | undefined

export interface HighlightOptions {
  /**
   * Specifies custom syntax highlighter.
   *
   * @default undefined
   */
  highlighter?: Highlighter
}
