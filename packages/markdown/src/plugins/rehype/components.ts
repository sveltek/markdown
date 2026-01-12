import { visit } from 'unist-util-visit'
import { meta } from '@/shared'
import type { Root } from 'hast'
import type { FileData } from '@/compile/types'
import type { Plugin } from '../types'

export const rehypeComponents: Plugin<[], Root> = () => {
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
