import { defineConfig } from '../../packages/markdown/dist/index.js'
import {
  remarkToc,
  remarkReadingStats,
  rehypeShiki,
} from '../../packages/unplugins/dist/index.js'
import type { ShikiOptions } from '../../packages/unplugins/dist/index.js'

export const shikiConfig: ShikiOptions = {
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
  layouts: [
    {
      name: 'default',
      path: 'src/content/layouts/default/layout.svelte',
    },
  ],
  entries: [
    {
      name: 'about',
      plugins: {
        rehype: [[rehypeShiki, shikiConfig]],
      },
    },
    {
      name: 'blog',
      plugins: {
        remark: [remarkToc],
      },
    },
    {
      name: 'support',
      plugins: {
        remark: [remarkReadingStats],
      },
    },
  ],
  components: [
    {
      name: 'GlobalButton',
      path: 'src/components/button/Button.svelte',
    },
  ],
})
