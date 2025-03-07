import { defineConfig, externals } from '@hypernym/bundler'
import { dependencies } from './package.json'

export default defineConfig({
  entries: [
    {
      input: './src/index.ts',
      externals: [...externals, ...Object.keys(dependencies), /^svelte/],
    },
    {
      dts: './src/types/index.ts',
      output: './dist/index.d.mts',
    },
  ],
})
