/**
 * Escapes certain Svelte special characters in a string, replacing them with their corresponding HTML entity codes.
 *
 * Ensures that the string can safely be used in templates or code.
 *
 * @example
 *
 * ```ts
 * import { escapeSvelte } from '@sveltek/markdown/utils'
 *
 * escapeSvelte(value)
 * ```
 */
export function escapeSvelte(value: string): string {
  return value
    .replace(
      /[{}`]/g,
      (v) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' })[v] || v,
    )
    .replace(/\\([trn])/g, '&#92;$1')
}
