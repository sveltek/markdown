import { resolve, relative } from 'node:path'
import { print, type AST } from 'svelte/compiler'
import { meta } from '@/shared'
import type { Components } from '@/config/types'
import type { ASTScript } from './types'

const posix = (path: string): string => path.replace(/\\/g, '/')

const getPath = (from: string, to: string): string => {
  const isRelativePath = ['.svelte', '.ts', '.mts', '.js', '.mjs'].some((ext) =>
    to.endsWith(ext),
  )
  if (isRelativePath) {
    const path = posix(relative(resolve(from, '..'), to))
    return path.startsWith('.') ? path : `./${path}`
  }
  return to
}

const parseComponents = (filePath: string, components?: Components): string =>
  components
    ?.map((value) => {
      const { form = 'default' } = value

      let path = getPath(filePath, value.path)
      const name = form === 'default' ? `default as ${value.name}` : value.name

      return `import { ${name} } from "${path}";`
    })
    .join('\n')
    .concat('\n') || ''

export function createSvelteInstance(
  instance: AST.Root['instance'],
  {
    filePath,
    layoutPath,
    components,
  }: {
    filePath: string
    layoutPath?: string
    components?: Components
  },
): ASTScript {
  const isLayout = filePath && layoutPath

  let code = ''
  const comps = parseComponents(filePath, components)

  if (comps) code += comps
  if (isLayout) {
    const path = getPath(filePath, layoutPath)
    code += `import ${meta.layoutName}, * as ${meta.componentName} from "${path}";\n`
  }

  if (!instance) {
    const content = code ? `<script>\n${code}</script>\n` : ''
    return { start: 0, end: 0, content }
  }

  const content = `<script>\n${code}${print(instance.content).code}\n</script>\n`

  return { start: instance.start, end: instance.end, content }
}
