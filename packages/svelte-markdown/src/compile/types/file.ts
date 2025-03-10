import type { PreprocessorGroup } from 'svelte/compiler'
import type { Plugins } from '@/plugins/types'
import type { Frontmatter } from './frontmatter'
import type { Layout } from './layouts'

export interface ASTScript {
  start: number
  end: number
  content: string
}

export interface FileData {
  preprocessors?: PreprocessorGroup[]
  plugins?: Plugins
  dependencies?: string[]
  frontmatter?: Frontmatter
  components?: string[]
  layout?: Layout
}
