import type { PluginList } from './plugins'

export interface Layout {
  /**
   * Specifies the path to the layout file.
   */
  path: string
  /**
   * Specifies the **layout-specific** plugins that will only be applied to markdown files that use this layout.
   *
   * Also, these plugins will run after the **top-level** plugins.
   *
   * @default undefined
   */
  plugins?: {
    /**
     * Specifies custom `remark` plugins at the **layout-level**.
     *
     * Parses source into a Markdown AST (MDAST).
     *
     * @default undefined
     */
    remark?: PluginList
    /**
     * Specifies custom `rehype` plugins at the **layout-level**.
     *
     * Parses source into a HTML AST (HAST).
     *
     * @default undefined
     */
    rehype?: PluginList
  }
}

export type Layouts = Record<string, Layout> & {
  default?: Layout
}
