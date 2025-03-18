import { createHighlighter } from 'shiki'
import { defineConfig } from '../../packages/svelte-markdown/dist/index.mjs'
import { remarkToc } from '../../packages/svelte-markdown/dist/plugins/index.mjs'

const theme = 'github-dark-default'
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ['javascript', 'typescript', 'svelte'],
})

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
    blog: {
      plugins: {
        remark: [remarkToc],
      },
    },
  },
  highlight: {
    highlighter: async ({ lang, code }) => {
      return highlighter.codeToHtml(code, { lang, theme })
    },
  },
})
