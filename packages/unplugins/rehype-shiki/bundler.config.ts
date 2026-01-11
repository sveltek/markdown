import { defineConfig } from '@hypernym/bundler'

export default defineConfig({
  externals: [/^@sveltek/, /^@shikijs/],
  entries: [
    { input: './src/index.ts' },
    {
      dts: './src/types.ts',
      output: './dist/index.d.ts',
    },
  ],
})
