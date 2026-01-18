import type {
  RehypeHighlightOptions,
  HighlighterData,
} from '@sveltek/rehype-highlight'
import type {
  ThemeInput,
  LanguageInput,
  CodeToHastOptions,
} from '@shikijs/core'

export * from '@shikijs/core'
export type { Highlighter, HighlighterData } from '@sveltek/rehype-highlight'

export interface LanguageRegistration {
  /**
   * Specifies the lang ID (e.g. `js`, `ts`, `svelte`).
   */
  id: string
  /**
   * Specifies the language input.
   */
  lang: LanguageInput
  /**
   * Specifies a list of custom language aliases.
   *
   * @default undefined
   */
  alias?: string[]
}

export interface ThemeRegistration {
  /**
   * Specifies the theme ID (e.g. `light`, `dark`, `dim`).
   */
  id: string
  /**
   * Specifies the theme name (e.g. `github-dark`, `github-light`).
   */
  name: string
  /**
   * Specifies the theme input.
   */
  theme: ThemeInput
}

export interface RehypeShikiOptions {
  /**
   * Specifies an array of language registration.
   *
   * @example
   *
   * ```ts
   * {
   *   langs: [
   *     { id: 'js', lang: import('@shikijs/langs/javascript') },
   *     { id: 'ts', lang: import('@shikijs/langs/typescript') },
   *     // ...
   *   ]
   * }
   * ```
   */
  langs: LanguageRegistration[]
  /**
   * Specifies an array of theme registration.
   *
   * @example
   *
   * ```ts
   * {
   *   themes: [
   *     { id: 'light', name: 'github-light', theme: import('@shikijs/themes/github-light') },
   *     { id: 'dark', name: 'github-dark', theme: import('@shikijs/themes/github-dark') },
   *     // ...
   *   ]
   * }
   * ```
   *
   * @default undefined
   */
  themes: ThemeRegistration[]
  /**
   * Specifies custom Shiki `codeToHtml` options.
   *
   * @default undefined
   */
  codeToHtml?: (
    data: HighlighterData,
  ) => Omit<CodeToHastOptions, 'lang' | 'theme' | 'themes'>
  /**
   * Specifies custom options for the `root` node (usually the `<pre>` tag).
   *
   * @example
   *
   * ```ts
   * {
   *   root: (node) => {
   *     node.tagName = 'div'
   *     node.properties.id = 'code-highlight'
   *     // ...
   *   }
   * }
   * ```
   *
   * @default undefined
   */
  root?: RehypeHighlightOptions['root']
}

export { rehypeShiki } from './'
