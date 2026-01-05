import type { PluginList } from '@/plugins/types'

export interface Entry {
  /**
   * Specifies the entry name.
   */
  name: string
  /**
   * Specifies the **entry-specific** plugins that will only be applied to this particular markdown file.
   *
   * Also, these plugins will run after **top-level** and **layout-level** plugins.
   *
   * @default undefined
   */
  plugins?: {
    /**
     * Specifies custom `remark` plugins at the **entry-level**.
     *
     * Parses source into a Markdown AST (MDAST).
     *
     * @default undefined
     */
    remark?: PluginList
    /**
     * Specifies custom `rehype` plugins at the **entry-level**.
     *
     * Parses source into a HTML AST (HAST).
     *
     * @default undefined
     */
    rehype?: PluginList
  }
}

export type Entries = Entry[]
