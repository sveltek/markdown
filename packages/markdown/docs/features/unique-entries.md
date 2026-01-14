# Unique Entries

<br>

```ts
// markdown.config.ts

import { defineConfig } from '@sveltek/markdown'

export const markdownConfig = defineConfig({
  entries: [
    {
      name: 'blog',
      plugins: {
        remark: [], // Specifies custom `remark` plugins at the entry-level (optional).
        rehype: [], // Specifies custom `rehype` plugins at the entry-level (optional).
      },
    },
    // ...
  ],
})
```

```markdown
---
title: Page Title
entry: blog
---
```

```markdown
---
entry: false
---
```

<br>

[← Back](../README.md)
