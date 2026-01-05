export interface GlobalComponent {
  /**
   * Specifies the component path.
   */
  path: string
  /**
   * Specifies the component name.
   */
  name: string
  /**
   * Specifies the component import form.
   *
   * @default 'default'
   */
  form?: 'default' | 'named'
}

export type Components = GlobalComponent[]
