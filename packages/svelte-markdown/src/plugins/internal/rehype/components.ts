import { visit } from 'unist-util-visit'
import { meta } from '@/utils'
import type { Root } from 'hast'
import type { FileData } from '@/compile/types'
import type { Plugin } from '@/plugins/types'

export const rehypeCreateComponents: Plugin<[], Root> = () => {
  return (tree, vfile) => {
    const data = vfile.data as FileData
    const { layout, components } = data

    if (!layout || !components) return

    visit(tree, 'element', (node) => {
      if (components.includes(node.tagName)) {
        node.tagName = `${meta.componentName}.${node.tagName}`
      }
    })
  }
}
