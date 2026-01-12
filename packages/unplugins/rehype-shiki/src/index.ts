import { type Unified, type Hast, type Plugin } from '@sveltek/markdown'
import { rehypeHighlight } from '@sveltek/rehype-highlight'
import {
  getSingletonHighlighterCore,
  type HighlighterCore,
  type ThemeInput,
} from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'
import type { RehypeShikiOptions } from './types'

export * from '@shikijs/core'

const highlightDetails = new Map<
  string,
  {
    core?: Promise<HighlighterCore>
    transformer?: Unified.Transformer<Hast.Root, Hast.Root> | void
  }
>()

/**
 * A custom `Rehype` plugin for `Shiki`.
 *
 * @example
 *
 * ```ts
 * import { svelteMarkdown } from '@sveltek/markdown'
 * import { rehypeShiki } from '@sveltek/rehype-shiki'
 *
 * svelteMarkdown({
 *   plugins: {
 *     rehype: [[rehypeShiki, options]]
 *   }
 * })
 * ```
 *
 * @see [Repository](https://github.com/sveltek/markdown/tree/main/packages/unplugins/rehype-shiki)
 */
export const rehypeShiki: Plugin<[RehypeShikiOptions], Hast.Root> = function (
  options: RehypeShikiOptions,
) {
  const { langs, themes, codeToHtml, root } = options

  const langNames: string[] = []
  const langRecord = langs.reduce<Record<string, number>>(
    (acc, { id, alias }, index) => {
      langNames.push(id)
      acc[id] = index
      alias?.forEach((a) => {
        langNames.push(a)
        acc[a] = index
      })
      return acc
    },
    {},
  )

  const key = JSON.stringify(themes, (key, value) =>
    key === 'theme' ? undefined : value,
  )

  let highlight = highlightDetails.get(key)
  if (!highlight) {
    const themeInputs: ThemeInput[] = []
    const themeRecord: Record<string, string> = {}

    themes.forEach(({ id, name, theme }) => {
      themeInputs.push(theme)
      themeRecord[id] = name
    })

    highlight = {
      core: getSingletonHighlighterCore({
        themes: themeInputs,
        langs: [],
        engine: createJavaScriptRegexEngine(),
      }),
      transformer: rehypeHighlight.call(this, {
        highlighter: async ({ code, lang = '', meta }) => {
          const highlighter = await highlight?.core
          if (!highlighter || !code) return

          const isLangValid = langNames.includes(lang)
          if (!isLangValid) lang = 'text'

          const codeToHtmlOptions = codeToHtml?.({ code, lang, meta })

          try {
            if (
              lang !== 'text' &&
              !highlighter.getLoadedLanguages().includes(lang)
            ) {
              const langIndex = langRecord[lang]
              const language = langs[langIndex].lang
              await highlighter.loadLanguage(language)
            }
          } catch (err) {
            console.log(err)
          }

          return highlighter.codeToHtml(code, {
            defaultColor: 'dark',
            tabindex: false,
            ...codeToHtmlOptions,
            lang,
            themes: themeRecord,
          })
        },
        root,
      }),
    }

    highlightDetails.set(key, highlight)
  }

  return async (tree, file) =>
    highlight?.transformer?.(tree, file, () => {}) as Hast.Root
}
