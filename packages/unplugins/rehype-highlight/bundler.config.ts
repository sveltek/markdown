import { defineConfig } from '@hypernym/bundler'

export default defineConfig({
  externals: [/^@sveltek/],
  entries: [
    { input: './src/index.ts' },
    {
      dts: './src/types.ts',
      output: './dist/index.d.ts',
    },
  ],
})
