import {
  defineConfig,
  jsConfig,
  tsConfig,
  svelteConfig,
  ignoresConfig,
} from '@sveltek/eslint-config'

export default defineConfig([jsConfig, tsConfig, svelteConfig, ignoresConfig])
