# Utils

<br>

## defineConfig

Defines configuration via custom `options` object that contains all available settings.

```ts
import { defineConfig } from '@sveltek/markdown'

export const markdownConfig = defineConfig({
  frontmatter: {
    defaults: {
      layout: 'default',
      author: 'Sveltek',
    },
  },
  layouts: [
    {
      name: 'default',
      path: 'lib/content/layouts/default/layout.svelte',
    },
  ],
})
```

## escapeSvelte

Escapes certain Svelte special characters in a string, replacing them with their corresponding HTML entity codes.

Ensures that the string can safely be used in templates or code.

```ts
import { escapeSvelte } from '@sveltek/markdown'

escapeSvelte(value)
```

## preprocess

```ts
import { preprocess } from '@sveltek/markdown'

const preprocessed = await preprocess(value, options)
```

<br>

[← Back](../README.md)
