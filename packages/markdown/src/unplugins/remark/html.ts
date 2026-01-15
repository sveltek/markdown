import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { Plugin } from '../types'

const rgxSvelteBlock = /{[#:/@]\w+.*}/
const rgxElementOrComponent = /<[A-Za-z]+[\s\S]*>/

export const remarkSvelteHtml: Plugin<[], Root> = () => {
  return (tree, vfile) => {
    visit(tree, 'paragraph', (node) => {
      const [child] = node.children

      if (child?.type !== 'text' && child?.type !== 'html') return

      if (
        (rgxSvelteBlock.test(child.value) ||
          rgxElementOrComponent.test(child.value)) &&
        node.position
      ) {
        const value = vfile.value.slice(
          node.position.start.offset,
          node.position.end.offset,
        )
        Object.assign(node, { type: 'html', value })
      }
    })
  }
}
