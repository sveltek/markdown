import { visit } from 'unist-util-visit'
import { toHtml } from 'hast-util-to-html'
import { escapeSvelte } from '@/utils/public'
import type { Root } from 'hast'
import type { Plugin } from '@/plugins/types'

export const rehypeRenderCode: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!['pre', 'code'].includes(node.tagName)) return

      let code = node.tagName === 'pre' ? node.children[0] : node

      if (code?.type !== 'element' || code?.tagName !== 'code') return

      const value = toHtml(code, {
        characterReferences: { useNamedReferences: true },
      })

      Object.assign(code, {
        type: 'raw',
        value: `{@html \`${escapeSvelte(value)}\`}`,
      })
    })
  }
}
