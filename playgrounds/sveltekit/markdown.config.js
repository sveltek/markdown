import { defineConfig } from '../../packages/markdown/dist/index.mjs'
import {
  remarkToc,
  remarkReadingStats,
  rehypeShiki,
} from '../../packages/unplugins/dist/index.mjs'

/** @type {import('../../packages/unplugins/dist/index.mjs').ShikiOptions} */
export const shikiConfig = {
  langs: ['html', 'javascript', 'typescript', 'svelte', 'shellscript'],
  codeToHtml: ({ lang, meta }) => ({
    tabindex: false,
    transformers: [
      {
        name: 'transformer-metadata',
        pre(node) {
          node.properties['data-theme'] = 'hypernym-dark'
          node.properties['data-lang'] = `${lang}`

          const isNumbers = meta?.includes('line-numbers') || false
          node.properties['data-line-numbers'] = `${isNumbers}`
        },
      },
    ],
  }),
}

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
        rehype: [[rehypeShiki, shikiConfig]],
      },
    },
    blog: {
      plugins: {
        remark: [remarkToc],
      },
    },
    support: {
      plugins: {
        remark: [remarkReadingStats],
      },
    },
  },
})
