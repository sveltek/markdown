import { isFunction } from './utils'
import type { HighlightOptions } from '@sveltek/markdown'
import type { BuiltinTheme } from 'shiki'
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
  const {
    theme,
    themes,
    langs,
    highlighter,
    codeToHtml: codeHtmlOptions,
    root = (node) => {
      node.tagName = 'div'
    },
  } = options

  const defaultTheme = theme || 'github-dark-default'
  const defaultLangs = langs || ['javascript', 'typescript', 'svelte']

  return async (tree, file) => {
    const { rehypeHighlight } = await import('@sveltek/markdown')
    const { getSingletonHighlighter } = await import('shiki')

    const shikiHighlighter = getSingletonHighlighter({
      ...highlighter,
      themes: highlighter?.themes ||
        (themes && (Object.values(themes) as BuiltinTheme[])) || [defaultTheme],
      langs: highlighter?.langs || defaultLangs,
    })
    const { codeToHtml } = await shikiHighlighter

    const highlightOptions: HighlightOptions = {
      highlighter: async ({ code, lang, meta }) => {
        const parsedMeta = options.parseMeta?.(meta)
        if (parsedMeta) meta = parsedMeta

        const codeHtml = isFunction(codeHtmlOptions)
          ? codeHtmlOptions({ code, lang, meta })
          : codeHtmlOptions

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
      root,
    }

    const transformer = rehypeHighlight.call(this, highlightOptions)
    return transformer?.(tree, file, () => {}) as Root
  }
}
