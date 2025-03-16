import { visit } from 'unist-util-visit'
import { isString, isArray } from '@/shared'
import { escapeSvelte } from '@/utils'
import type { Root, Element } from 'hast'
import type { Plugin } from '@/plugins/types'
import type { HighlightData, Highlight } from '@/compile/types'

const getLang = (el: Element): string | undefined =>
  (isArray(el.properties.className) &&
    isString(el.properties.className[0]) &&
    el.properties.className[0]?.replace('language-', '')) ||
  undefined

const getMeta = (el: Element): string | undefined => el.data?.meta || undefined

const getCode = (el: Element): string | undefined =>
  el.children[0]?.type === 'text'
    ? el.children[0].value.replace(/\n$/, '')
    : undefined

const getHighlightData = (el: Element): HighlightData => {
  return {
    lang: getLang(el),
    meta: getMeta(el),
    code: getCode(el),
  }
}

export const rehypeHighlight: Plugin<[Highlight], Root> = (
  options: Highlight = {},
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
      const code = await highlighter?.(getHighlightData(el))
      if (code) Object.assign(el, { type: 'raw', value: escapeSvelte(code) })
    }

    await Promise.all(els.map((el) => highlight(el)))
  }
}
