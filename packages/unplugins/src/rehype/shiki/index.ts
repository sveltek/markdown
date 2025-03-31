import { rehypeHighlight, type HighlightOptions } from '@sveltek/markdown'
import { createHighlighter, type BuiltinTheme } from 'shiki'
import type { Root } from 'hast'
import type { Plugin } from '@/types'
import type { ShikiOptions } from './types'

/**
 * A custom `Rehype` plugin for `Shiki`.
 *
 * @example
 *
 * ```js
 * import { svelteMarkdown } from '@sveltek/markdown'
 * import { rehypeShiki } from '@sveltek/unplugins'
 *
 * svelteMarkdown({
 *   plugins: {
 *     rehype: [rehypeShiki]
 *   }
 * })
 * ```
 *
 * Or with options:
 *
 * ```js
 * svelteMarkdown({
 *   plugins: {
 *     rehype: [[rehypeShiki, { theme: 'github-light-default' }]]
 *   }
 * })
 * ```
 */
export const rehypeShiki: Plugin<[ShikiOptions?], Root> = function (
  options: ShikiOptions = {},
) {
  const { theme, themes, langs, highlighter, codeToHtml: codeHtml } = options

  const defaultTheme = theme || 'github-dark-default'
  const defaultLangs = langs || ['javascript', 'typescript', 'svelte']

  const shikiHighlighter = createHighlighter({
    ...highlighter,
    themes: highlighter?.themes ||
      (themes && (Object.values(themes) as BuiltinTheme[])) || [defaultTheme],
    langs: highlighter?.langs || defaultLangs,
  })

  return async (tree, file) => {
    const { codeToHtml } = await shikiHighlighter

    const highlightOptions: HighlightOptions = {
      highlighter: async ({ code, lang, meta }) => {
        options.parseMeta?.(meta)

        if (code) {
          return codeToHtml(code, {
            ...codeHtml,
            lang: lang || 'text',
            ...(themes
              ? { themes: codeHtml?.themes || themes }
              : { theme: codeHtml?.theme || defaultTheme }),
          })
        }
      },
    }

    const transformer = rehypeHighlight.call(this, highlightOptions)
    return transformer?.(tree, file, () => {}) as Root
  }
}
