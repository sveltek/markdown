import { toMarkdown } from 'mdast-util-to-markdown'
import { visit, CONTINUE, SKIP } from 'unist-util-visit'
import type { Root, Paragraph } from 'mdast'
import type { Plugin } from '../types'

const rgxSvelteBlock = /{[#:/@]\w+.*}/
const rgxElementOrComponent = /<[A-Za-z]+[\s\S]*>/

const convertToComponent = (value: string): string => {
  const tagMatch = value.match(/^::(\S+)/)
  if (!tagMatch) return value

  const tagName = tagMatch[1]
  const isBlock = value.match(/::\s*$/)
  const attrs =
    value
      .slice(tagName.length + 2)
      .split('\n')[0]
      .trim() || ''

  if (isBlock) {
    const content = value.split('\n').slice(1, -1).join('\n').trim()
    return `<${tagName} ${attrs}>${content}</${tagName}>`
  }

  return `<${tagName} ${attrs} />`
}

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

      if (child.value.startsWith('::')) {
        child.value = convertToComponent(child.value)
        convertToHtml(node)
        return SKIP
      }

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
