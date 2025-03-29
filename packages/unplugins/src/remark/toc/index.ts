import { visit } from 'unist-util-visit'
import type { Properties } from 'hast'
import type { Root } from 'mdast'
import type { Plugin } from '@/types'
import type { TocOptions, TocItems } from './types'

/**
 * A custom `Remark` plugin that creates `Table of Content` (Toc).
 *
 * Automatically adds a link with the appropriate attributes to the headings.
 *
 * It also stores Toc items to `frontmatter` for easy access.
 *
 * @example
 *
 * ```ts
 * import { svelteMarkdown } from '@sveltek/markdown'
 * import { remarkToc } from '@sveltek/unplugins'
 *
 * svelteMarkdown({
 *   plugins: {
 *     remark: [remarkToc]
 *   }
 * })
 * ```
 *
 * Or with options:
 *
 * ```js
 * svelteMarkdown({
 *   plugins: {
 *     remark: [[remarkToc, { depth: 3 }]]
 *   }
 * })
 * ```
 */
export const remarkToc: Plugin<[TocOptions?], Root> = (
  options: TocOptions = {},
) => {
  const { depth = 3, links = true } = options

  return (tree, vfile) => {
    const frontmatter = vfile.data.frontmatter as {
      toc: TocItems
    }

    const toc: TocItems = []
    let i = 0

    visit(tree, 'heading', (node) => {
      const [child] = node.children

      let value = ''
      let id = ''

      if (child.type === 'text') {
        value = child.value
        id = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
      }

      if (links) {
        node.children = []
        node.children.push({
          type: 'link',
          url: `#${id}`,
          children: [{ type: 'text', value }],
        })
      }

      const data = (node.data || (node.data = {})) as {
        hProperties?: Properties
      }
      const props = data.hProperties || (data.hProperties = {})

      if (node.depth > 1 && node.depth <= depth) {
        if (toc.some((h) => h.id === id)) id = `${id}-${i + 1}`
        if (!props.id) props.id = id
        toc.push({ id, depth: node.depth, value })
      }
    })

    frontmatter.toc = toc
  }
}
