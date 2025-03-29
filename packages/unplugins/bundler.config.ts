import { defineConfig } from '@hypernym/bundler'

export default defineConfig({
  entries: [
    // Main
    {
      input: './src/index.ts',
    },
    {
      dts: './src/types.ts',
      output: './dist/index.d.mts',
    },
  ],
})
