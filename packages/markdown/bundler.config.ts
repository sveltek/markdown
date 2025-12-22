import { defineConfig, externals } from '@hypernym/bundler'
import { dependencies } from './package.json'

export default defineConfig({
  entries: [
    // Shared
    {
      externals: [],
      input: './src/shared/index.ts',
    },
    // Utils
    { input: './src/utils/index.ts' },
    {
      dts: './src/utils/types.ts',
      output: './dist/utils/index.d.ts',
    },
    // Main
    {
      input: './src/index.ts',
      externals: [
        ...externals,
        ...Object.keys(dependencies),
        /^svelte/,
        /^esrap/,
        '@/shared',
        '@/utils',
      ],
      paths: [
        { find: '@/shared', replacement: './shared/index.js' },
        { find: '@/utils', replacement: './utils/index.js' },
      ],
    },
    {
      dts: './src/types/index.ts',
      output: './dist/index.d.ts',
    },
  ],
})
