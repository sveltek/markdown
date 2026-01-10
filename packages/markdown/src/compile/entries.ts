import { isObject } from '@/shared'
import type { MarkdownOptions } from '@/config/types'
import type { FileData, Entry } from './types'

export function getEntryData(
  data: FileData,
  { entries }: { entries?: MarkdownOptions['entries'] } = {},
): Entry | undefined {
  const { entry } = data.frontmatter!

  if (!entries || !entry) return

  const entryName = isObject(entry) ? entry.name : entry
  const entryOptions = entries.find(({ name }) => name === entryName)

  if (!entryOptions) {
    const names = entries.map((entry) => `"${entry.name}"`).join(', ')
    throw new TypeError(`Invalid entry name. Valid names are: ${names}.`)
  }

  return entryOptions
}
