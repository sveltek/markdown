import type { MarkdownConfig } from '@/config/types'

export interface CompileOptions {
  filename?: string
  config?: MarkdownConfig
  /**
   * @experimental This option is experimental and may change at any time, so use it with caution.
   *
   * @default true
   */
  htmlTag?: boolean
  /**
   * @experimental This option is experimental and may change at any time, so use it with caution.
   *
   * @default true
   */
  module?: boolean
}
