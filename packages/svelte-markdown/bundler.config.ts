import { defineConfig, externals, resolvePaths } from '@hypernym/bundler'
import { dependencies } from './package.json'

export default defineConfig({
  entries: [
    // Utils
    {
      input: './src/utils/public/index.ts',
      output: './dist/utils/index.mjs',
    },
    {
      dts: './src/utils/public/types.ts',
      output: './dist/utils/index.d.mts',
    },
    // Main
    {
      input: './src/index.ts',
      externals: [
        ...externals,
        ...Object.keys(dependencies),
        /^svelte/,
        '@/utils/public',
      ],
      paths: resolvePaths([
        { find: '@/utils/public', replacement: './utils/index.mjs' },
      ]),
    },
    {
      dts: './src/types/index.ts',
      output: './dist/index.d.mts',
    },
  ],
})
