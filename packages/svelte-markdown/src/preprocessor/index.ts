import { meta } from '@/utils'
import { compile } from '@/compile'
import type { PreprocessorGroup } from 'svelte/compiler'
import type { MarkdownConfig } from '@/config/types'

/**
 * Svelte Markdown Preprocessor.
 *
 * @example
 *
 * ```ts
 * // svelte.config.js
 * import adapter from '@sveltejs/adapter-static'
 * import { svelteMarkdown } from '@hypernym/svelte-markdown'
 *
 * const config = {
 *   kit: { adapter: adapter() },
 *   preprocess: [svelteMarkdown()],
 *   extensions: ['.svelte', '.md'],
 * }
 *
 * export default config
 * ```
 *
 * @see [Repository](https://github.com/hypernym-studio/svelte-markdown)
 */
export function svelteMarkdown(config: MarkdownConfig = {}): PreprocessorGroup {
  return {
    name: meta.name,
    async markup({ content, filename }) {
      const { extensions = ['.md'] } = config

      const isExtSupported = extensions.some((ext) => filename?.endsWith(ext))
      if (!isExtSupported) return

      return await compile(content, { filename, config })
    },
  }
}
