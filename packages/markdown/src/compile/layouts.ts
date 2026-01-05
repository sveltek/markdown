import { isObject } from '@/shared'
import type { MarkdownConfig } from '@/config/types'
import type { FileData, Layout } from './types'

export function getLayoutData(
  data: FileData,
  config: MarkdownConfig = {},
): Layout | undefined {
  const { layout } = data.frontmatter!

  if (!config.layouts || !layout) return

  const layoutName = isObject(layout) ? layout.name : layout
  const layoutConfig = config.layouts.find(({ name }) => name === layoutName)

  if (!layoutConfig) {
    const names = config.layouts.map((layout) => `"${layout.name}"`).join(', ')
    throw new TypeError(`Invalid layout name. Valid names are: ${names}.`)
  }

  return layoutConfig
}
