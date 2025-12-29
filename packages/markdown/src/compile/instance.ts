import { resolve, relative } from 'node:path'
import { print } from 'esrap'
import ts from 'esrap/languages/ts'
import { meta } from '@/shared'
import type { AST } from 'svelte/compiler'
import type { MarkdownConfig } from '@/types'
import type { ASTScript } from './types'

const posix = (path: string): string => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  const hasNonAscii = /[^\0-\x80]+/.test(path)
  if (isExtendedLengthPath || hasNonAscii) return path
  return path.replace(/\\/g, '/')
}

const getRelativePath = (from: string, to: string): string => {
  const path = posix(relative(resolve(from, '..'), to))
  return path.startsWith('.') ? path : `./${path}`
}

export const getImports = (imports: MarkdownConfig['imports']): string =>
  imports
    ?.map((value) => `${value.path};`)
    .join('\n')
    .concat('\n') || ''

export function createSvelteInstance(
  instance: AST.Root['instance'],
  {
    filePath,
    layoutPath,
    imports,
  }: {
    filePath?: string
    layoutPath?: string
    imports?: MarkdownConfig['imports']
  },
): ASTScript {
  const isLayout = filePath && layoutPath

  let code = ''
  const globals = getImports(imports)

  if (isLayout) {
    const path = getRelativePath(filePath, layoutPath)
    code = `${globals}import ${meta.layoutName}, * as ${meta.componentName} from "${path}";\n`
  } else {
    code = globals
  }

  if (!instance) {
    const content = code ? `<script>\n${code}</script>\n` : ''
    return { start: 0, end: 0, content }
  }

  const content = `<script>\n${code}${print(instance.content as any, ts()).code}\n</script>\n`

  return { start: instance.start, end: instance.end, content }
}
