import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { svelteMarkdown } from '../../packages/svelte-markdown/dist/index.mjs'

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
  preprocess: [svelteMarkdown(), vitePreprocess()],
  extensions: ['.svelte', '.md'],
}

export default config
