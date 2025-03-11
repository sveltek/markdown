import type { MarkdownConfig } from '@/config/types'
import type { FileData, Layout } from './types'

export function getLayoutData(
  data: FileData,
  config: MarkdownConfig = {},
): (Layout & { name: string | false }) | undefined {
  const { layout } = data.frontmatter!

  if (!config.layouts || !layout) return

  const layoutConfig = config.layouts[layout]
  if (!layoutConfig) {
    throw new TypeError(
      `Invalid layout name. Valid names are: ${Object.keys(config.layouts).join(', ')}.`,
    )
  }

  return {
    name: layout,
    ...layoutConfig,
  }
}
