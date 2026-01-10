import type { Hast } from '@sveltek/markdown'

export interface HighlighterData {
  lang: string | undefined
  meta: string | undefined
  code: string | undefined
}

export type Highlighter = (
  data: HighlighterData,
) => Promise<string | undefined> | string | undefined

export interface RehypeHighlightOptions {
  /**
   * Specifies custom syntax highlighter.
   */
  highlighter: Highlighter
  /**
   * Specifies custom options for the `root` node (usually the `<pre>` tag).
   *
   * @default undefined
   */
  root?: (node: Hast.Element) => void
}

export * from './'
