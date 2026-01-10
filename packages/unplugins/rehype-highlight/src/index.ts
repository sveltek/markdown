import { visit, type Hast, type Plugin } from '@sveltek/markdown'
import { escapeSvelte } from '@sveltek/markdown'
import { getHighlighterData } from './utils'
import type { RehypeHighlightOptions, HighlighterData } from './types'

/**
 * A custom `Rehype` plugin that creates code highlighter.
 *
 * @example
 *
 * ```ts
 * import { svelteMarkdown } from '@sveltek/markdown'
 * import { rehypeHighlight } from '@sveltek/rehype-highlight'
 *
 * svelteMarkdown({
 *   plugins: {
 *     rehype: [[rehypeHighlight, options]]
 *   }
 * })
 * ```
 */
export const rehypeHighlight: Plugin<[RehypeHighlightOptions], Hast.Root> = (
  options: RehypeHighlightOptions,
) => {
  const {
    highlighter,
    root = (node) => {
      node.tagName = 'div'
    },
  } = options

  return async (tree) => {
    const els: { el: Hast.Element; data: HighlighterData }[] = []

    const highlight = async (el: Hast.Element, data: HighlighterData) => {
      const code = await highlighter(data)
      if (code) Object.assign(el, { type: 'raw', value: escapeSvelte(code) })
    }

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre' || !node.children?.length) return
      const [code] = node.children
      let data: HighlighterData | undefined
      if (code.type === 'element' && code.tagName === 'code') {
        data = getHighlighterData(code)
        els.push({ el: code, data })
      }
      const d = (node.data || (node.data = {})) as Hast.ElementData & {
        highlight?: { data?: HighlighterData }
      }
      d.highlight = { data }
      root?.(node)
    })

    await Promise.all(els.map(({ el, data }) => highlight(el, data)))
  }
}
