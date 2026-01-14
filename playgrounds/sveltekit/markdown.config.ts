import { defineConfig } from '@sveltek/markdown'
import { rehypeShiki, type RehypeShikiOptions } from '@sveltek/rehype-shiki'
import { remarkReadingStats } from '@sveltek/remark-reading-stats'
import { remarkToc } from '@sveltek/remark-toc'

export const rehypeShikiOptions: RehypeShikiOptions = {
  themes: [
    {
      id: 'dark',
      name: 'github-dark-default',
      theme: import('@shikijs/themes/github-dark-default'),
    },
    // ...
  ],
  langs: [
    { id: 'ts', lang: import('@shikijs/langs/typescript') },
    // ...
  ],
  codeToHtml: ({ lang, meta }) => {
    const lineNumbers = meta?.includes('line-numbers') || false

    return {
      transformers: [
        {
          name: 'transformer-metadata',
          pre(node) {
            node.properties['data-theme'] = 'hypernym-dark'
            node.properties['data-lang'] = `${lang}`
            node.properties['data-line-numbers'] = `${lineNumbers}`
          },
        },
      ],
    }
  },
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
        rehype: [[rehypeShiki, rehypeShikiOptions]],
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
