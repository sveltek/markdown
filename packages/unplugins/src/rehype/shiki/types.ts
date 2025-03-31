import {
  createHighlighter,
  type CodeToHastOptions,
  type CodeOptionsSingleTheme,
  type CodeOptionsMultipleThemes,
} from 'shiki'

type HighlighterOptions = Parameters<typeof createHighlighter>[0]

export interface ShikiOptions {
  /**
   * Specifies a custom theme.
   *
   * @example
   *
   * ```ts
   * {
   *   theme: 'github-light-default',
   * }
   * ```
   *
   * @default 'github-dark-default'
   */
  theme?: CodeOptionsSingleTheme['theme']
  /**
   * Specifies a map of color names to themes.
   *
   * Allows multiple themes for the generated code.
   *
   * @example
   *
   * ```ts
   * {
   *   themes: {
   *     light: 'github-light-default',
   *     dark: 'github-dark-default',
   *   }
   * }
   * ```
   *
   * @default undefined
   */
  themes?: CodeOptionsMultipleThemes['themes']
  /**
   * Specifies a custom Shiki language registration.
   *
   * @example
   *
   * ```ts
   * {
   *   langs: ['javascript', 'typescript', 'svelte']
   * }
   * ```
   *
   * @default ['javascript', 'typescript', 'svelte']
   */
  langs?: HighlighterOptions['langs']
  /**
   * Specifies custom Shiki `highlighter` options.
   *
   * @default undefined
   */
  highlighter?: HighlighterOptions
  /**
   * Specifies custom Shiki `codeToHtml` options.
   *
   * @default undefined
   */
  codeToHtml?: CodeToHastOptions &
    CodeOptionsSingleTheme &
    CodeOptionsMultipleThemes
  /**
   * Parses `meta` string from the code block.
   *
   * @default undefined
   */
  parseMeta?: (meta: string | undefined) => void
}
