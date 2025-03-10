import { basename } from 'node:path'
import { readFile } from 'node:fs/promises'
import { preprocess, parse } from 'svelte/compiler'
import { visit } from 'unist-util-visit'
import { toHtml } from 'hast-util-to-html'
import { meta } from '@/utils'
import type { AST } from 'svelte/compiler'
import type { Root, Element, ElementContent } from 'hast'
import type { FileData } from '@/compile/types'
import type { Plugin } from '../types'

const escape = (value: string): string =>
  value
    .replace(
      /[{}`]/g,
      (v) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' })[v] || v,
    )
    .replace(/\\([trn])/g, '&#92;$1')

export const rehypeRenderCode: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!['pre', 'code'].includes(node.tagName)) return

      let code: (ElementContent | Omit<Element, 'type'>) & {
        type: string
        value?: string
      } = node.tagName === 'pre' ? node.children[0] : node

      if (!code || code.type !== 'element' || code.tagName !== 'code') return

      const value = toHtml(code as Element, {
        characterReferences: { useNamedReferences: true },
      })

      code.type = 'raw'
      code.value = `{@html \`${escape(value)}\`}`
    })
  }
}

const getExportedNames = (module: AST.Root['module']): string[] => {
  const names: string[] = []

  if (module?.content) {
    module.content.body.forEach((node) => {
      if (node.type === 'ExportNamedDeclaration') {
        node.specifiers.forEach((specifier) => {
          if (specifier.exported.type === 'Identifier') {
            names.push(specifier.exported.name)
          }
        })
      }
    })
  }

  return names
}

export const rehypeCreateLayout: Plugin<[], Root> = () => {
  return async (_, file) => {
    const data = file.data as FileData

    const layout = data.layout
    if (!layout) return

    const source = await readFile(layout.path, { encoding: 'utf8' })
    const filename = basename(layout.path)

    const { code, dependencies } = await preprocess(
      source,
      data.preprocessors!,
      { filename },
    )

    if (dependencies) data.dependencies!.push(...dependencies)

    const root = parse(code, { filename, modern: true })
    const { module } = root

    if (module) {
      const namedExports = getExportedNames(module)
      if (namedExports.length > 0) data.components = namedExports
    }
  }
}

export const rehypeCreateComponents: Plugin<[], Root> = () => {
  return (tree, file) => {
    const data = file.data as FileData
    const { layout, components } = data

    if (!layout || !components) return

    visit(tree, 'element', (node) => {
      if (components.includes(node.tagName)) {
        node.tagName = `${meta.componentName}.${node.tagName}`
      }
    })
  }
}
