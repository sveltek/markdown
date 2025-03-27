import type { PluginList } from './types'

export const usePlugins = (plugins: PluginList | undefined): PluginList =>
  plugins ?? []
