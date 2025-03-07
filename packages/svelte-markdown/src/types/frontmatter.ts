export type Frontmatter = Record<string, unknown> & {
  defaults?: Record<string, unknown>
  layout?: string | false
}
