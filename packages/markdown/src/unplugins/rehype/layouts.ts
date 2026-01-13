import { basename } from 'node:path'
import { readFile } from 'node:fs/promises'
import { preprocess, parse } from 'svelte/compiler'
import type { AST } from 'svelte/compiler'
import type { Root } from 'hast'
import type { FileData } from '@/preprocess/types'
import type { Plugin } from '../types'

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

export const rehypeLayout: Plugin<[], Root> = () => {
  return async (_, vfile) => {
    const data = vfile.data as FileData

    const { layout } = data
    if (!layout) return

    const source = await readFile(layout.path, { encoding: 'utf8' })
    const filename = basename(layout.path)

    const { code, dependencies } = await preprocess(
      source,
      data.preprocessors!,
      { filename },
    )

    if (dependencies) data.dependencies?.push(...dependencies)

    const { module } = parse(code, { filename, modern: true })

    if (module) {
      const namedExports = getExportedNames(module)
      if (namedExports.length) data.components = namedExports
    }
  }
}
