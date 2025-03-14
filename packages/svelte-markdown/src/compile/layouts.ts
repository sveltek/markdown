import { isObject } from '@/shared'
import type { MarkdownConfig } from '@/config/types'
import type { FileData, Layout } from './types'

export function getLayoutData(
  data: FileData,
  config: MarkdownConfig = {},
): (Layout & { name: string | false }) | undefined {
  const { layout } = data.frontmatter!

  if (!config.layouts || !layout) return

  const layoutName = isObject(layout) ? layout.name : layout

  const layoutConfig = config.layouts[layoutName]
  if (!layoutConfig) {
    throw new TypeError(
      `Invalid layout name. Valid names are: ${Object.keys(config.layouts).join(', ')}.`,
    )
  }

  return {
    name: layoutName,
    ...layoutConfig,
  }
}
