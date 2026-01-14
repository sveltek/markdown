# Quickstart

<br>

## Zero-Config Setup

```ts
// svelte.config.ts

import adapter from '@sveltejs/adapter-static'
import { svelteMarkdown } from '@sveltek/markdown'
import type { Config } from '@sveltejs/kit'

const config: Config = {
  preprocess: [svelteMarkdown()],
  extensions: ['.svelte', '.md'],
  kit: { adapter: adapter() },
}

export default config
```

## Custom Config Setup

```ts
// markdown.config.ts

import { defineConfig } from '@sveltek/markdown'

export const markdownConfig = defineConfig({
  frontmatter: {
    defaults: {
      layout: 'default',
      author: {
        name: 'Sveltek',
        url: 'https://github.com/sveltek',
      },
      // other global data...
    },
  },
  layouts: [
    {
      name: 'default',
      path: 'lib/content/layouts/default/layout.svelte',
    },
    {
      name: 'blog',
      path: 'lib/content/layouts/blog/layout.svelte',
      plugins: {
        remark: [],
        rehype: [],
      },
    },
    // other layouts...
  ],
  // ...
})
```

Import the config into the `svelte.config.ts` file:

```ts
// svelte.config.ts

import adapter from '@sveltejs/adapter-static'
import { svelteMarkdown } from '@sveltek/markdown'
import { markdownConfig } from './markdown.config.ts'
import type { Config } from '@sveltejs/kit'

const config: Config = {
  preprocess: [svelteMarkdown(markdownConfig)],
  extensions: ['.svelte', '.md'],
  kit: { adapter: adapter() },
}

export default config
```

## Types

If you work with `TypeScript` and `Markdown` components, you can define types to avoid potential issues when importing `.md` into `.svelte` files.

```ts
// src/app.d.ts

declare global {
  namespace App {
    declare module '*.md' {
      import type { Component } from 'svelte'

      declare const MarkdownComponent: Component

      export default MarkdownComponent
    }
  }
}

export {}
```

Now you can import `.md` file into `.svelte` without type errors:

```svelte
<!-- +page.svelte -->

<script lang="ts">
  import Comp from '$lib/content/components/comp.md'
</script>

<Comp />
```

<br>

[← Back](../README.md)
