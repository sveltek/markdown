import { visit, type Mdast, type Hast, type Plugin } from '@sveltek/markdown'
import type { RemarkTocOptions, TocItems } from './types'

/**
 * A custom `Remark` plugin that creates `Table of Contents` (Toc).
 *
 * Automatically adds a link with the appropriate attributes to the headings.
 *
 * It also stores Toc items to `frontmatter` for easy access.
 *
 * @example
 *
 * ```ts
 * import { svelteMarkdown } from '@sveltek/markdown'
 * import { remarkToc } from '@sveltek/remark-toc'
 *
 * svelteMarkdown({
 *   plugins: {
 *     remark: [[remarkToc, options]]
 *   }
 * })
 * ```
 *
 * @see [Repository](https://github.com/sveltek/markdown/tree/main/packages/unplugins/remark-toc)
 */
export const remarkToc: Plugin<[RemarkTocOptions?], Mdast.Root> = (
  options: RemarkTocOptions = {},
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

      const data = (node.data || (node.data = {})) as Mdast.HeadingData & {
        hProperties?: Hast.Properties
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
