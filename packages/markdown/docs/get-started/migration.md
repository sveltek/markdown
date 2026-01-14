# Breaking Changes

<br>

## Layouts

Updates global `layouts` option.

```diff
svelteMarkdown({
-  layouts: {},
+  layouts: [],
})
```

```diff
svelteMarkdown({
-  layouts: {
-    default: {
-      path: '...',
-    },
-  },
+  layouts: [
+    {
+      name: 'default',
+      path: '...',
+    },
+  ]
})
```

## Entries

Updates global `entries` option.

```diff
svelteMarkdown({
-  entries: {},
+  entries: [],
})
```

```diff
svelteMarkdown({
-  entries: {
-    default: {},
-  },
+  entries: [
+    {
+      name: 'default',
+    },
+  ]
})
```

## Global Components

Switching from the global `imports` option to the `components` option.

All global `layouts`, `entries` and `components` options are now aligned, predictable and easier to follow.

- `imports` → `components`

```diff
svelteMarkdown({
-  imports: [],
+  components: [],
})
```

```ts
svelteMarkdown({
  components: [
    {
      name: 'GlobalButton', // Specifies the component name
      path: 'src/components/button/Button.svelte', // Specifies the component path
    },
    // ...
  ],
})
```

## Escape Svelte Util

Moves util `escapeSvelte` to the main root subpath.

```diff
- import { escapeSvelte } from '@sveltek/markdown/utils'
+ import { escapeSvelte } from '@sveltek/markdown'
```

## Compile Util

Renames the `compile` function to `preprocess` to match the `svelte/compiler` API.

Currently, `compile` returns `Promise<Processed>` data which can be misleading if you expect `CompiledResult` (this was inspired by `mdsvex` API which is now outdated).

It would be more obvious what this does if the function were actually called `preprocess`. More info in the official [docs](https://svelte.dev/docs/svelte/svelte-compiler).

Also, it flats markdown `options` into the main options object.

```diff
- import { compile } from '@sveltek/markdown'
- compile(code, { config: {} }) // explicit markdown config object

+ import { preprocess } from '@sveltek/markdown'
+ preprocess(code, { ...config }) // flats config object into main options
```

## Special Component Syntax `::`

Removes built-in support for `non-standard` component syntax in favor of an external plugin.

```diff
- ::Component

- ::Component prop="data"

- ::Component
-   Children content
- ::
```

## Markdown Options

Renames main `options` interface from `config` to `options`.

```diff
- import type { MarkdownConfig } from '@sveltek/markdown'
+ import type { SvelteMarkdownOptions } from '@sveltek/markdown'
```

## Highlight

> [!NOTE]
>
> This is required only for advanced usage and more complex cases.
>
> Recommended way is to simply use the official [`@sveltek/rehype-shiki`](https://github.com/sveltek/markdown/tree/main/packages/unplugins/rehype-shiki) plugin.
>
> Official `Shiki` plugin is preconfigured under the hood, super flexible and easy to use, so you can focus only on importing custom `themes` and `langs`.

Removes `highlight` option in favor of external plugin [`@sveltek/rehype-highlight`](https://github.com/sveltek/markdown/tree/main/packages/unplugins/rehype-highlight).

It is easier to maintain as a separate feature and is more flexible as it can be used `globally`, per `layout` or per `entry`. Also, not everyone needs the code highlighting in a markdown project by default.

```diff
svelteMarkdown({
-  highlight: {
-    highlighter: async ({ lang, code }) => {
-      return highlighter.codeToHtml(code, { lang, theme })
-    },
-  },
})
```

1. Install separate plugin `@sveltek/rehype-highlight`:

```sh
pnpm add -D @sveltek/rehype-highlight
```

2. Add plugin options:

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import {
  rehypeHighlight,
  type RehypeHighlightOptions,
} from '@sveltek/rehype-highlight'
import { createHighlighter } from 'shiki'

const theme = 'github-dark-default'
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ['javascript', 'typescript', 'svelte'],
})

const highlightOptions: RehypeHighlightOptions = {
  highlighter: async ({ lang, code }) => {
    return highlighter.codeToHtml(code, { lang, theme })
  },
}

svelteMarkdown({
  plugins: {
    rehype: [[rehypeHighlight, highlightOptions]],
  },
})
```

## Unplugins

Moves all `unplugins` into separate packages.

- [`@sveltek/rehype-highlight`](https://github.com/sveltek/markdown/tree/main/packages/unplugins/rehype-highlight)
- [`@sveltek/rehype-shiki`](https://github.com/sveltek/markdown/tree/main/packages/unplugins/rehype-shiki)
- [`@sveltek/remark-reading-stats`](https://github.com/sveltek/markdown/tree/main/packages/unplugins/remark-reading-stats)
- [`@sveltek/remark-toc`](https://github.com/sveltek/markdown/tree/main/packages/unplugins/remark-toc)

```diff
- import { rehypeShiki, remarkReadingStats, remarkToc } from '@sveltek/unplugins'
+ import { rehypeShiki } from '@sveltek/rehype-shiki'
+ import { remarkReadingStats } from '@sveltek/remark-reading-stats'
+ import { remarkToc } from '@sveltek/remark-toc'
```

<br>

[← Back](../README.md)
