import type { PreprocessorGroup } from 'svelte/compiler'
import type { PluginList } from '@/plugins/types'
import type { Layouts } from '@/compile/types'

export interface MarkdownConfig {
  /**
   * Specifies custom file extensions.
   *
   * @default ['.md']
   */
  extensions?: string[]
  /**
   * Specifies a custom list of preprocessors that will be applied to a Svelte file.
   *
   * @default undefined
   */
  preprocessors?: PreprocessorGroup[]
  /**
   * Specifies the **top-level** plugins that will be used for all markdown files.
   *
   * @default undefined
   */
  plugins?: {
    /**
     * Specifies custom `remark` plugins at the **top-level**.
     *
     * Parses source into a Markdown AST (MDAST).
     *
     * @default undefined
     */
    remark?: PluginList
    /**
     * Specifies custom `rehype` plugins at the **top-level**.
     *
     * Parses source into a HTML AST (HAST).
     *
     * @default undefined
     */
    rehype?: PluginList
  }
  /**
   * Specifies a custom layout records.
   *
   * Layout component serves as a wrapper for the markdown files, which means the page content is displayed via the component's children prop.
   *
   * @default undefined
   */
  layouts?: Layouts
  /**
   * Defines frontmatter custom options.
   *
   * By default, frontmatter only supports the `YAML` format, but allows additional customization via parser.
   *
   * @default undefined
   */
  frontmatter?: {
    /**
     * Specifies frontmatter global data to be applied to all markdown files.
     *
     * @default undefined
     */
    defaults?: Record<string, unknown>
    /**
     * Specifies the **start/end** symbols for the frontmatter content block.
     *
     * It only works in combination with the default parser.
     *
     * @default '-'
     */
    marker?: string
    /**
     * Specifies a custom parser for frontmatter.
     *
     * Allows adaptation to other formats such as `TOML` or `JSON`.
     *
     * @default undefined
     */
    parser?: (value: string) => Record<string, unknown> | void
  }
}
