import { defineConfig } from '../../packages/markdown/dist/index.mjs'
import { remarkToc, rehypeShiki } from '../../packages/unplugins/dist/index.mjs'

export const markdownConfig = defineConfig({
  frontmatter: {
    defaults: {
      layout: 'default',
      author: {
        name: 'Ivo Dolenc',
        url: 'https://github.com/ivodolenc',
      },
    },
  },
  layouts: {
    default: {
      path: 'src/content/layouts/default/layout.svelte',
    },
  },
  entries: {
    about: {
      plugins: {
        rehype: [rehypeShiki],
      },
    },
    blog: {
      plugins: {
        remark: [remarkToc],
      },
    },
  },
})
