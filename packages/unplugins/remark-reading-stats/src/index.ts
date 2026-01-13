import { visit, type Mdast, type Plugin } from '@sveltek/markdown'
import { readingStats } from './stats'
import type { RemarkReadingStatsOptions, ReadingStats } from './types'

/**
 * A custom `Remark` plugin that creates reading stats.
 *
 * Stores reading details to `frontmatter` for easy access.
 *
 * @example
 *
 * ```ts
 * import { svelteMarkdown } from '@sveltek/markdown'
 * import { remarkReadingStats } from '@sveltek/remark-reading-stats'
 *
 * svelteMarkdown({
 *   plugins: {
 *     remark: [[remarkReadingStats, options]]
 *   }
 * })
 * ```
 *
 * @see [Repository](https://github.com/sveltek/markdown/tree/main/packages/unplugins/remark-reading-stats)
 */
export const remarkReadingStats: Plugin<
  [RemarkReadingStatsOptions?],
  Mdast.Root
> = (options: RemarkReadingStatsOptions = {}) => {
  const { wordsPerMinute } = options

  return (tree, vfile) => {
    const frontmatter = vfile.data.frontmatter as {
      readingStats: ReadingStats
    }

    let text = ''

    visit(tree, 'text', (node) => {
      text += node.value
    })

    frontmatter.readingStats = readingStats(text, { wordsPerMinute })
  }
}
