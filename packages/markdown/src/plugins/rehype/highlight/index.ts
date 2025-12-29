import { visit } from 'unist-util-visit'
import { escapeSvelte } from '@/utils'
import { getHighlighterData } from './utils'
import type { Root, Element } from 'hast'
import type { Plugin } from '@/plugins/types'
import type { HighlightOptions, HighlighterData } from './types'

/**
 * A custom `Rehype` plugin that creates code highlighter.
 *
 * @example
 *
 * ```ts
 * import { rehypeHighlight } from '@sveltek/markdown'
 *
 * svelteMarkdown({
 *   plugins: {
 *     rehype: [[rehypeHighlight, options]]
 *   }
 * })
 * ```
 */
export const rehypeHighlight: Plugin<[HighlightOptions], Root> = (
  options: HighlightOptions,
) => {
  return async (tree) => {
    const { highlighter, root } = options

    if (!highlighter) return

    const els: { el: Element; data: HighlighterData }[] = []

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre' || !node.children?.length) return
      const [code] = node.children
      let data: HighlighterData | undefined
      if (code.type === 'element' && code.tagName === 'code') {
        data = getHighlighterData(code)
        els.push({ el: code, data })
      }
      const d = (node.data || (node.data = {})) as Element['data'] & {
        highlight?: { data?: HighlighterData }
      }
      d.highlight = { data }
      root?.(node)
    })

    const highlight = async (el: Element, data: HighlighterData) => {
      const code = await highlighter(data)
      if (code) Object.assign(el, { type: 'raw', value: escapeSvelte(code) })
    }

    await Promise.all(els.map(({ el, data }) => highlight(el, data)))
  }
}
