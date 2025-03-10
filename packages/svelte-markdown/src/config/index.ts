import type { MarkdownConfig } from './types'

/**
 * Defines configuration via custom `options` object that contains all available settings.
 *
 * @example
 *
 * ```ts
 * import { defineConfig } from '@hypernym/svelte-markdown'
 *
 * export const markdownConfig = defineConfig({
 *   frontmatter: {
 *     defaults: {
 *       layout: 'default',
 *       author: 'Hypernym Studio',
 *     },
 *   },
 *   layouts: {
 *     default: {
 *       path: 'lib/content/layouts/default/layout.svelte',
 *     },
 *   },
 * })
 * ```
 */
export function defineConfig(config: MarkdownConfig): MarkdownConfig {
  return config
}
