import { isObject } from '@/shared'
import type { SvelteMarkdownOptions } from '@/config/types'
import type { FileData, Layout } from './types'

export function getLayoutData(
  data: FileData,
  { layouts }: { layouts?: SvelteMarkdownOptions['layouts'] } = {},
): Layout | undefined {
  const { layout } = data.frontmatter!

  if (!layouts || !layout) return

  const layoutName = isObject(layout) ? layout.name : layout
  const layoutOptions = layouts.find(({ name }) => name === layoutName)

  if (!layoutOptions) {
    const names = layouts.map((layout) => `"${layout.name}"`).join(', ')
    throw new TypeError(`Invalid layout name. Valid names are: ${names}.`)
  }

  return layoutOptions
}
