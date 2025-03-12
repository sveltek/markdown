import { toMarkdown } from 'mdast-util-to-markdown'
import { visit, CONTINUE, SKIP } from 'unist-util-visit'
import type { Root, Paragraph } from 'mdast'
import type { Plugin } from '@/plugins/types'

const rgxSvelteBlock = /{[#:/@]\w+.*}/
const rgxElementOrComponent = /<[A-Za-z]+[\s\S]*>/

const convertToHtml = (node: Paragraph): void => {
  let value = ''

  for (const child of node.children) {
    if (child.type === 'text' || child.type === 'html') value += child.value
    else value += toMarkdown(child)
  }

  Object.assign(node, { type: 'html', value })
}

export const remarkSvelteHtml: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      const [child] = node.children

      if (child?.type !== 'text' && child?.type !== 'html') return CONTINUE

      if (
        rgxSvelteBlock.test(child.value) ||
        rgxElementOrComponent.test(child.value)
      ) {
        convertToHtml(node)
        return SKIP
      }
    })
  }
}
