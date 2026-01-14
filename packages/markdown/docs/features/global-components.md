# Global Components

<br>

```ts
// markdown.config.ts

import { defineConfig } from '@sveltek/markdown'

export const markdownConfig = defineConfig({
  components: [
    {
      name: 'Link',
      path: 'src/lib/components/ui/Link.svelte',
    },
    {
      name: 'Button',
      path: 'src/components/button/Button.svelte',
    },
    // ...
  ],
})
```

```markdown
---
title: About page
description: Svelte Markdown Preprocessor.
---

<Link />

<Button />
```

<br>

[← Back](../README.md)
