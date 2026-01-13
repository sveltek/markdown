import type { PreprocessorGroup } from 'svelte/compiler'
import type { Plugins } from '@/unplugins/types'
import type { Frontmatter, Layout } from '@/config/types'

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
