import adapter from '@sveltejs/adapter-static'
import { svelteMarkdown } from '@sveltek/markdown'
import { markdownConfig } from './markdown.config.ts'
import type { Config } from '@sveltejs/kit'

const config: Config = {
  kit: {
    adapter: adapter({
      fallback: '404.html',
    }),
    alias: {
      $: 'src',
    },
  },
  preprocess: [svelteMarkdown(markdownConfig)],
  extensions: ['.svelte', '.md'],
  compilerOptions: {
    runes: true,
  },
}

export default config
