import type { PluggableList } from 'unified'
export type { Plugin } from 'unified'

export type PluginList = PluggableList

export interface Plugins {
  remark?: PluginList
  rehype?: PluginList
}
