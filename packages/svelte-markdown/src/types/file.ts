import type { PreprocessorGroup } from 'svelte/compiler'
import type { Plugins } from './plugins'
import type { Frontmatter } from './frontmatter'
import type { Layout } from './layouts'

export interface ASTScript {
  start: number
  end: number
  content: string
}

export interface FileData {
  preprocessors?: PreprocessorGroup[]
  dependencies?: string[]
  plugins?: Plugins
  frontmatter?: Frontmatter
  components?: string[]
  layout?: Layout
  instance?: ASTScript
}
