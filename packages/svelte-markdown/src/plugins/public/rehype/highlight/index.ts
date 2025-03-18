import { visit } from 'unist-util-visit'
import { escapeSvelte } from '@/utils'
import { getHighlighterData } from './utils'
import type { Root, Element } from 'hast'
import type { Plugin } from '@/plugins/types'
import type { HighlightOptions } from './types'

/**
 * A custom `Rehype` plugin that creates code highlighter.
 *
 * @example
 *
 * ```ts
 * import { rehypeHighlight } from '@hypernym/svelte-markdown/plugins'
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
    const { highlighter } = options

    if (!highlighter) return

    const els: Element[] = []

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre' || !node.children?.length) return
      const [code] = node.children
      if (code.type === 'element' && code.tagName === 'code') els.push(code)
    })

    const highlight = async (el: Element) => {
      const code = await highlighter?.(getHighlighterData(el))
      if (code) Object.assign(el, { type: 'raw', value: escapeSvelte(code) })
    }

    await Promise.all(els.map((el) => highlight(el)))
  }
}
