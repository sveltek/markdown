import { defineConfig, externals } from '@hypernym/bundler'
import { dependencies, devDependencies } from './package.json'

export default defineConfig({
  entries: [
    // Main
    {
      input: './src/index.ts',
      externals: [
        ...externals,
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
      ],
    },
    {
      dts: './src/types.ts',
      output: './dist/index.d.ts',
      externals: [
        ...externals,
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
      ],
    },
  ],
})
