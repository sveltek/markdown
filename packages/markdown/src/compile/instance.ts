import { resolve, relative } from 'node:path'
import { print } from 'esrap'
import ts from 'esrap/languages/ts'
import { meta } from '@/shared'
import type { AST } from 'svelte/compiler'
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

export function createSvelteInstance(
  instance: AST.Root['instance'],
  filePath: string,
  layoutPath: string,
): ASTScript {
  const path = getRelativePath(filePath, layoutPath)

  const imports = `import ${meta.layoutName}, * as ${meta.componentName} from "${path}";\n`

  if (!instance) {
    const content = `<script>\n${imports}</script>\n`
    return { start: 0, end: 0, content }
  }

  const content = `<script>\n${imports}${print(instance.content as any, ts()).code}\n</script>\n`

  return { start: instance.start, end: instance.end, content }
}
