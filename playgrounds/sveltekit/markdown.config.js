import { defineConfig } from '../../packages/svelte-markdown/dist/index.mjs'

export const markdownConfig = defineConfig({
  frontmatter: {
    defaults: {
      author: {
        name: 'Ivo Dolenc',
        url: 'https://github.com/ivodolenc',
      },
    },
  },
  layouts: {
    default: {
      path: 'src/layouts/default/layout.svelte',
    },
  },
})
