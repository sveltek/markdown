import type { PreprocessorGroup } from 'svelte/compiler'
import type { PluginList } from '@/plugins/types'
import type { FrontmatterOptions } from './frontmatter'
import type { Layouts } from './layouts'
import type { Entries } from './entries'
import type { Components } from './components'

export interface SvelteMarkdownOptions {
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
   * Defines frontmatter custom options.
   *
   * By default, frontmatter only supports the `YAML` format, but allows additional customization via parser.
   *
   * @default undefined
   */
  frontmatter?: FrontmatterOptions
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
   * Specifies a custom layout array.
   *
   * Layout component serves as a wrapper for the markdown files, which means the page content is displayed via the component's children prop.
   *
   * Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).
   *
   * @default undefined
   */
  layouts?: Layouts
  /**
   * Specifies a custom entry array.
   *
   * Entry serves as a special configuration for markdown files, which means it is similar to layout but without the need to create a custom component file.
   *
   * Allows unique and straightforward customization for an individual markdown file. An entry can be a page or a component.
   *
   * Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).
   *
   * @default undefined
   */
  entries?: Entries
  /**
   * Defines global components that can be used in all markdown files without manual setup.
   *
   * Especially useful for some generic components like buttons, links, images, etc.
   *
   * @default undefined
   */
  components?: Components
}
