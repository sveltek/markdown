import { isObject } from '@/shared'
import type { Entry, Entries } from '@/config/types'
import type { FileData } from './types'

export function getEntryData(
  data: FileData,
  { entries }: { entries?: Entries } = {},
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
