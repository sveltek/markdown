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

  const entryConfig = config.entries[entryName]
  if (!entryConfig) {
    throw new TypeError(
      `Invalid entry name. Valid names are: ${Object.keys(config.entries).join(', ')}.`,
    )
  }

  return entryConfig
}
