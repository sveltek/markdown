export interface RemarkTocOptions {
  /**
   * Specifies the maximum headings depth to be included in the table of content.
   *
   * @default 3
   */
  depth?: number
  /**
   * Specifies whether headings include link tags.
   *
   * @default true
   */
  links?: boolean
}

export interface TocItem {
  id: string
  depth: number
  value: string
}

export type TocItems = TocItem[]

export * from './'
