import type { MarkdownConfig } from './types'

/**
 * Defines configuration via custom `options` object that contains all available settings.
 *
 * @example
 *
 * ```ts
 * import { defineConfig } from '@sveltek/markdown'
 *
 * export const markdownConfig = defineConfig({
 *   frontmatter: {
 *     defaults: {
 *       layout: 'default',
 *       author: 'Sveltek',
 *     },
 *   },
 *   layouts: [
 *     {
 *       name: 'default',
 *       path: 'lib/content/layouts/default/layout.svelte',
 *     },
 *   ],
 * })
 * ```
 */
export function defineConfig(config: MarkdownConfig): MarkdownConfig {
  return config
}
