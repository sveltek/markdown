import { visit } from 'unist-util-visit'
import { readingStats } from './stats'
import type { Root } from 'mdast'
import type { Plugin } from '@/types'
import type { ReadingStatsOptions, ReadingStats } from './types'

/**
 * A custom `Remark` plugin that creates `Reading Stats`.
 *
 * Stores reading details to `frontmatter` for easy access.
 *
 * @example
 *
 * ```ts
 * import { svelteMarkdown } from '@sveltek/markdown'
 * import { remarkReadingStats } from '@sveltek/unplugins'
 *
 * svelteMarkdown({
 *   plugins: {
 *     remark: [remarkReadingStats]
 *   }
 * })
 * ```
 *
 * Or with options:
 *
 * ```js
 * svelteMarkdown({
 *   plugins: {
 *     remark: [[remarkReadingStats, { wordsPerMinute: 300 }]]
 *   }
 * })
 * ```
 */
export const remarkReadingStats: Plugin<[ReadingStatsOptions?], Root> = (
  options: ReadingStatsOptions = {},
) => {
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
