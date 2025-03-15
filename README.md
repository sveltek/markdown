<h1 align="center">Svelte Markdown</h1>

<p align="center">Svelte Markdown Preprocessor.</p>

<p align="center">
  <a href="https://github.com/hypernym-studio/svelte-markdown">Repository</a>
  <span>✦</span>
  <a href="https://www.npmjs.com/package/@hypernym/svelte-markdown">Package</a>
  <span>✦</span>
  <a href="https://github.com/hypernym-studio/svelte-markdown/releases">Releases</a>
  <span>✦</span>
  <a href="https://github.com/hypernym-studio/svelte-markdown/discussions">Discussions</a>
</p>

<br>

<pre align="center">pnpm add -D @hypernym/svelte-markdown</pre>

<br>

> [!NOTE]
>
> While the **API** is solid and mostly complete, some changes may still occur before the first stable release.
>
> Ideas, [suggestions](https://github.com/hypernym-studio/svelte-markdown/discussions) and code [contributions](https://github.com/hypernym-studio/svelte-markdown/blob/main/.github/CONTRIBUTING.md) are welcome.
>
> If you find any issues or bugs, please [report](https://github.com/hypernym-studio/svelte-markdown/issues/new/choose) them so the project can be improved.

<br>

## Features

- Free & Open Source
- Written in TypeScript
- Extremely Easy to Use
- Zero-config setup
- API-Friendly

## Core Concepts

- **Custom Components:** Simplifies development by supporting `import`/`export` of reusable components.
- **Named Layouts:** Provides a powerful named `layout` mechanism to completely customize page design.
- **Unified Plugins:** Enables content transformation using widely-adopted tools like `remark` and `rehype`.
- **Global Frontmatter:** Streamlines workflow by offering centralized options for markdown `metadata`.
- **Special Elements:** Supports parsing Svelte special elements such as `svelte:head` etc. in markdown files.
- **Code Highlighter:** Offers quick and easy customization for `syntax highlighting`.

## Intro

> This project was inspired by [MDsveX](https://github.com/pngwn/MDsveX) — thanks to its authors for their awesome work!

**Svelte Markdown** has been completely rewritten to take full advantage of `Svelte 5` and its `Runes` mode.

It’s a light, simple and powerful preprocessor designed specifically for managing `Markdown` content within `Svelte` projects.

Also, it comes with zero-config setup, built-in types and a dev-friendly API.

## Docs

The plan is to create online docs soon, so until its published, feel free to ask questions or share feedback in the official [Discussions](https://github.com/hypernym-studio/svelte-markdown/discussions).

## Installation

Install `@hypernym/svelte-markdown` package:

```sh
# via pnpm
pnpm add -D @hypernym/svelte-markdown
```

```sh
# via npm
npm install -D @hypernym/svelte-markdown
```

## Usage

### Zero-Config Setup

```js
// svelte.config.js

import adapter from '@sveltejs/adapter-static'
import { svelteMarkdown } from '@hypernym/svelte-markdown'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [svelteMarkdown()],
  extensions: ['.svelte', '.md'],
  kit: { adapter: adapter() },
}

export default config
```

### Custom Config Setup

```js
// markdown.config.js

import { defineConfig } from '@hypernym/svelte-markdown'

export const markdownConfig = defineConfig({
  frontmatter: {
    defaults: {
      layout: 'default',
      author: {
        name: 'Hypernym Studio',
        url: 'https://github.com/hypernym-studio',
      },
      // other global data...
    },
  },
  layouts: {
    default: {
      path: 'lib/content/layouts/default/layout.svelte',
    },
    blog: {
      path: 'lib/content/layouts/blog/layout.svelte',
      plugins: {
        remark: [],
        rehype: [],
      },
    },
    // other layouts...
  },
})
```

Import the config to the `svelte.config.js` file:

```js
// svelte.config.js

import adapter from '@sveltejs/adapter-static'
import { svelteMarkdown } from '@hypernym/svelte-markdown'
import { markdownConfig } from './markdown.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [svelteMarkdown(markdownConfig)],
  extensions: ['.svelte', '.md'],
  kit: { adapter: adapter() },
}

export default config
```

### Types

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

```html
<!-- +page.svelte -->

<script lang="ts">
  import Comp from '$lib/content/components/comp.md'
</script>

<Comp />
```

## Examples

> [!NOTE]
>
> More examples will be added to the online docs.

### Playground

Explore the [playground](https://github.com/hypernym-studio/svelte-markdown/tree/main/playgrounds/sveltekit) to see more details.

### Custom Components

```markdown
---
title: Page Title
---

<script lang="ts">
  import { Component } from '$lib/components'
</script>

<Component />

Content...
```

### Named Layouts

```markdown
---
title: Page Title
layout: default
---

Content...
```

```markdown
---
layout: false
---

Content...
```

### Special Elements

```markdown
---
title: About page
description: Svelte Markdown Preprocessor.
layout: false
specialElements: true
---

<svelte:head>

  <title>Custom Title - {title}</title>
  <meta name="description" content={`Custom Description - ${description}`} />
</svelte:head>

<style>
  p { 
    opacity: 0.6;
    font-family: monospace;
    font-size: 1.125rem;
  }
</style>

{description}

Content...
```

## Code Highlighting

### Shiki Syntax Highlighter

```ts
import { createHighlighter } from 'shiki'

const theme = 'github-dark-default'
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ['javascript', 'typescript', 'svelte'],
})

svelteMarkdown({
  highlight: {
    highlighter: async ({ lang, code }) => {
      return highlighter.codeToHtml(code, { lang, theme })
    },
  },
})
```

## Plugins

> [!NOTE]
>
> It's likely that some `plugins` will soon become official and available via subpath.
>
> ```ts
> import { plugin } from '@hypernym/svelte-markdown/plugins'
> ```

### Remark Reading Stats

```ts
import { visit, CONTINUE } from 'unist-util-visit'
import readingTime from 'reading-time'
import type { Frontmatter } from '@hypernym/svelte-markdown'
import type { Plugin, Mdast } from '@hypernym/svelte-markdown/plugins'

/**
 * Estimates how long an article will take to read.
 */
export const remarkReadingStats: Plugin<[], Mdast.Root> = () => {
  return (tree, file) => {
    const frontmatter = file.data.frontmatter as Frontmatter

    let text = ''

    visit(tree, ['text', 'code'], (node) => {
      if (node.type !== 'text' && node.type !== 'code') return CONTINUE

      text += node.value

      frontmatter.readingStats = readingTime(text)
    })
  }
}
```

Config:

```js
svelteMarkdown({
  plugins: {
    remark: [remarkReadingStats],
  },
})
```

Usage in markdown page:

```markdown
---
title: Page title
---

Reading stats: {JSON.stringify(readingStats)}

# returns an object: { text: '1 min read', minutes: 1, time: 60000, words: 200 }

Reading time: {readingStats.text}

# returns an string: '1 min read'
```

## API

```ts
import {
  svelteMarkdown,
  defineConfig,
  compile,
} from '@hypernym/svelte-markdown'

import { escapeSvelte } from '@hypernym/svelte-markdown/utils'
```

### preprocessor

- Type: `function svelteMarkdown(config?: MarkdownConfig): PreprocessorGroup`

```ts
import { svelteMarkdown } from '@hypernym/svelte-markdown'

svelteMarkdown(config)
```

### defineConfig

- Type: `function defineConfig(config: MarkdownConfig): MarkdownConfig`

```ts
import { defineConfig } from '@hypernym/svelte-markdown'

defineConfig(config)
```

### compile

- Type: `function compile(source: string, options: CompileOptions): Promise<Processed>`

```ts
import { compile } from '@hypernym/svelte-markdown'

compile(source, options)
```

### escapeSvelte

- Type: `function escapeSvelte(value: string): string`

```ts
import { escapeSvelte } from '@hypernym/svelte-markdown/utils'

escapeSvelte(value)
```

## Types

Package exposes types from the `main` module path and from the `plugins` subpath for easier workflow.

### main

Imports all types from the main package.

```ts
import type {
  ASTScript,
  CompileOptions,
  FileData,
  Frontmatter,
  Highlight,
  HighlightData,
  Highlighter,
  Layout,
  Layouts,
  MarkdownConfig,
} from '@hypernym/svelte-markdown'
```

### plugins

Imports all types from `Unified`, `VFile`, `Mdast` and `Hast` as namespaces so there is no need to install additional packages.

Super useful when building custom plugins.

```ts
import type {
  Plugin,
  Plugins,
  PluginList,
  Unified,
  VFile,
  Mdast,
  Hast,
} from '@hypernym/svelte-markdown/plugins'

// Unified collective
Unified.Transformer
// ...

// Virtual file
VFile.Options
// ...

// Remark plugins
Mdast.Root
Mdast.Code
// ...

// Rehype plugins
Hast.Root
Hast.Element
// ...
```

## Options

All options are documented with descriptions and examples so autocompletion will be offered as you type. Simply hover over the property and see what it does in the quick info tooltip.

### extensions

- Type: `string[]`
- Default: `['.md']`

Specifies custom file extensions.

```ts
svelteMarkdown({
  extensions: ['.md'],
})
```

### preprocessors

- Type: `PreprocessorGroup[]`
- Default: `undefined`

Specifies a custom list of preprocessors that will be applied to a Svelte file.

```ts
svelteMarkdown({
  preprocessors: [vitePreprocess()],
})
```

### plugins

- Type: `{ remark: [], rehype: [] }`
- Default: `undefined`

Specifies the **top-level** plugins that will be used for all markdown files.

```ts
svelteMarkdown({
  plugins: {
    remark: [], // Specifies custom `remark` plugins at the top-level (optional).
    rehype: [], // Specifies custom `rehype` plugins at the top-level (optional).
  },
})
```

Also, plugins can be disabled at the **file-level**:

```markdown
---
title: Page title
plugins:
  remark: false # Disables remark plugins for this file only
  rehype: false # Disables rehype plugins for this file only
---

Content...
```

### layouts

- Type: `Record<string, Layout>`
- Default: `undefined`

Specifies a custom layout records.

Layout component serves as a wrapper for the markdown files, which means the page content is displayed via the component's children prop.

```ts
svelteMarkdown({
  layouts: {
    default: {
      path: 'lib/content/layouts/default/layout.svelte', // Specifies the path to the layout file (required).
      plugins: {
        remark: [], // Specifies custom `remark` plugins at the layout-level (optional).
        rehype: [], // Specifies custom `rehype` plugins at the layout-level (optional).
      },
    },
    blog: {
      path: 'lib/content/layouts/blog/layout.svelte',
    },
  },
})
```

Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).

**File-level**

```markdown
---
title: Page title
layout: blog
---

Content...
```

Also, layout plugins can be disabled at the **file-level**:

```markdown
---
title: Page title
layout:
  name: blog
  plugins:
    remark: false # Disables remark layout plugins for this file only
    rehype: false # Disables rehype layout plugins for this file only
---

Content...
```

**Config**

```ts
svelteMarkdown({
  frontmatter: {
    defaults: {
      layout: 'default',
    },
  },
})
```

### frontmatter

- Type: `object`
- Default: `undefined`

Defines frontmatter custom options.

By default, frontmatter only supports the `YAML` format, but allows additional customization via parser.

#### defaults

- Type: `Record<string, unknown>`
- Default: `undefined`

Specifies frontmatter global data to be applied to all markdown files.

```ts
svelteMarkdown({
  frontmatter: {
    defaults: {
      author: 'Hypernym Studio',
    },
  },
})
```

#### marker

- Type: `string`
- Default: `-`

Specifies the **start/end** symbols for the frontmatter content block.

It only works in combination with the default parser.

```ts
svelteMarkdown({
  frontmatter: {
    marker: '+',
  },
})
```

#### parser

- Type: `(value: string) => Record<string, unknown> | void`
- Default: `undefined`

Specifies a custom parser for frontmatter.

Allows adaptation to other formats such as `TOML` or `JSON`.

```ts
svelteMarkdown({
  frontmatter: {
    parser: (file) => {
      // ...
    },
  },
})
```

### highlight

- Type: `object`
- Default: `undefined`

Defines custom syntax highlighting options.

#### highlighter

- Type: `(data: HighlightData) => Promise<string | undefined> | string | undefined`
- Default: `undefined`

Specifies custom syntax highlighter.

```ts
svelteMarkdown({
  highlight: {
    highlighter: async ({ lang, meta, code }) => {
      // ...
      return code
    },
  },
})
```

### specialElements

- Type: `boolean`
- Default: `undefined`

Specifies support for parsing Svelte `special` elements such as [`svelte:head`](https://svelte.dev/docs/svelte/svelte-head) etc. in markdown files.

Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).

If you don't plan to use them in every markdown file, it is recommended to enable the option only on those pages where you really need it.

**File-level**

```markdown
---
title: Page title
specialElements: true
---

<svelte:head>...</svelte:head>

Content...
```

**Config**

```ts
svelteMarkdown({
  frontmatter: {
    defaults: {
      specialElements: true,
    },
  },
})
```

## Community

Feel free to ask questions or share new ideas.

Use the official [discussions](https://github.com/hypernym-studio/svelte-markdown/discussions) to get involved.

## Contribute

Check out the quick [guide](https://github.com/hypernym-studio/svelte-markdown/blob/main/.github/CONTRIBUTING.md) for more info.

## License

Developed in 🇭🇷 Croatia, © Hypernym Studio.

Released under the [MIT](LICENSE.txt) license.
