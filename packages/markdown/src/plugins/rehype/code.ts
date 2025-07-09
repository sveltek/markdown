import { visit } from 'unist-util-visit'
import { toHtml } from 'hast-util-to-html'
import { escapeSvelte } from '@/utils'
import type { Root } from 'hast'
import type { Plugin } from '@/plugins/types'

interface Options {
  htmlTag?: boolean
}

export const rehypeRenderCode: Plugin<[Options?], Root> = ({
  htmlTag,
}: Options = {}) => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!['pre', 'code'].includes(node.tagName)) return

      let code = node.tagName === 'pre' ? node.children[0] : node

      if (code?.type !== 'element' || code?.tagName !== 'code') return

      const value = toHtml(code, {
        characterReferences: { useNamedReferences: true },
      })

      const parsed = escapeSvelte(value)

      Object.assign(code, {
        type: 'raw',
        value: htmlTag ? `{@html \`${parsed}\`}` : parsed,
      })
    })
  }
}
