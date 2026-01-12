import { parse as parseYaml } from 'yaml'
import type { VFile } from 'vfile'
import type { FrontmatterOptions } from '@/config/types'
import type { FileData } from './types'

interface ParsedFile {
  svelte: string
}

export function parseFile(
  vfile: VFile,
  { frontmatter }: { frontmatter?: FrontmatterOptions } = {},
): ParsedFile {
  const { marker = '-', parser, defaults = {} } = frontmatter || {}

  const parsedFile: ParsedFile = { svelte: '' }

  const data = vfile.data as FileData

  if (defaults) data.frontmatter = { ...defaults }

  let file = String(vfile)

  const rgxFm = new RegExp(
    `^\\s*[${marker}]{3}\\s*\\r?\\n([\\s\\S]*?)\\r?\\n\\s*[${marker}]{3}`,
  )

  if (parser) {
    const parsed = parser(file)
    if (parsed) data.frontmatter = { ...defaults, ...parsed }
  } else {
    const match = rgxFm.exec(file)
    if (match && match[1]) {
      data.frontmatter = { ...defaults, ...parseYaml(match[1]) }
      file = file.slice(match[0].length)
      vfile.value = file
    }
  }

  if (data.frontmatter?.specialElements) {
    if (file.includes('<svelte:')) {
      const rgxSvelte =
        /<svelte:([a-zA-Z]+)(\s[^>]*)?(?:\/>|>([\s\S]*?)<\/svelte:\1>)/g

      file = file.replace(rgxSvelte, (match) => {
        parsedFile.svelte += match
        return ''
      })

      vfile.value = file
    }
  }

  return parsedFile
}
