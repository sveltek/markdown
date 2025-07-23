import { print } from 'esrap'
import ts from 'esrap/languages/ts'
import type { AST } from 'svelte/compiler'
import type { FileData, ASTScript } from './types'

export function createSvelteModule(
  module: AST.Root['module'],
  data: FileData,
): ASTScript {
  const keys = Object.keys(data.frontmatter!)

  let frontmatter = `export const frontmatter = ${JSON.stringify(data.frontmatter)};\n`
  if (keys.length) {
    frontmatter += `const { ${keys.join(', ')} } = frontmatter;\n`
  }

  if (!module) {
    const content = `<script module>\n${frontmatter}</script>\n`
    return { start: 0, end: 0, content }
  }

  const content = `<script module>\n${frontmatter}${print(module.content as any, ts()).code}\n</script>\n`

  return { start: module.start, end: module.end, content }
}
