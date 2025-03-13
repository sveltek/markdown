export type Frontmatter = Record<string, unknown> & {
  /**
   * Specifies frontmatter global data to be applied to all markdown files.
   *
   * @default undefined
   */
  defaults?: Record<string, unknown>
  /**
   * Specifies layout name.
   *
   * To disable the layout, simply set it to `layout: false`.
   *
   * @default undefined
   */
  layout?: string | false
  /**
   * Specifies support for parsing Svelte `special` elements such as `svelte:head` etc. in markdown files.
   *
   * Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).
   *
   * If you don't plan to use them in every markdown file, it is recommended to enable the option only on those pages where you really need it.
   *
   * @default undefined
   */
  specialElements?: boolean
  /**
   * Specifies at the **file-level** whether plugins will be used or not.
   *
   * Useful if you want to completely disable plugins in a specific markdown file.
   *
   * @default undefined
   */
  plugins?: {
    remark?: false
    rehype?: false
  }
}
