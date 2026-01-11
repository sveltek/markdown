import { meta } from '@/shared'
import { compile } from '@/compile'
import type { PreprocessorGroup } from 'svelte/compiler'
import type { SvelteMarkdownOptions } from '@/config/types'

/**
 * Svelte Markdown Preprocessor.
 *
 * @example
 *
 * ```ts
 * // svelte.config.js
 * import adapter from '@sveltejs/adapter-static'
 * import { svelteMarkdown } from '@sveltek/markdown'
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
 * @see [Repository](https://github.com/sveltek/markdown)
 */
export function svelteMarkdown(
  options: SvelteMarkdownOptions = {},
): PreprocessorGroup {
  return {
    name: meta.name,
    async markup({ content, filename }) {
      const { extensions = ['.md'] } = options

      const isExtSupported = extensions.some((ext) => filename?.endsWith(ext))
      if (!isExtSupported) return

      return await compile(content, { filename, ...options })
    },
  }
}
