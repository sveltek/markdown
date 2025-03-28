import type { PluggableList } from 'unified'
export type { Plugin } from 'unified'

export type PluginList = PluggableList

export interface Plugins {
  remark?: PluginList
  rehype?: PluginList
}

export type * as Unified from 'unified'
export type * as VFile from 'vfile'
export type * as Mdast from 'mdast'
export type * as Hast from 'hast'

export * from './rehype/highlight'
export * from './rehype/highlight/types'
