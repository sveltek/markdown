import adapter from '@sveltejs/adapter-static'
import { svelteMarkdown } from '../../packages/svelte-markdown/dist/index.mjs'
import { markdownConfig } from './markdown.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
}

export default config
