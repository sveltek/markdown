import { defineConfig, externals } from '@hypernym/bundler'
import { dependencies } from './package.json'

export default defineConfig({
  entries: [
    // Shared
    {
      externals: [],
      input: './src/shared/index.ts',
    },
    // Main
    {
      input: './src/index.ts',
      externals: [
        ...externals,
        ...Object.keys(dependencies),
        /^svelte/,
        '@/shared',
      ],
      paths: [{ find: '@/shared', replacement: './shared/index.js' }],
    },
    {
      externals: [
        ...externals,
        ...Object.keys(dependencies),
        /^svelte/,
        'hast',
        'mdast',
      ],
      dts: './src/types/index.ts',
      output: './dist/index.d.ts',
    },
  ],
})
