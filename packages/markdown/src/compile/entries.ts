import { isObject } from '@/shared'
import type { MarkdownConfig } from '@/config/types'
import type { FileData, Entry } from './types'

export function getEntryData(
  data: FileData,
  config: MarkdownConfig = {},
): Entry | undefined {
  const { entry } = data.frontmatter!

  if (!config.entries || !entry) return

  const entryName = isObject(entry) ? entry.name : entry
  const entryConfig = config.entries.find(({ name }) => name === entryName)

  if (!entryConfig) {
    const names = config.entries.map((entry) => `"${entry.name}"`).join(', ')
    throw new TypeError(`Invalid entry name. Valid names are: ${names}.`)
  }

  return entryConfig
}
