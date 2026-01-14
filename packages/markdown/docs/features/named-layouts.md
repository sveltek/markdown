# Named Layouts

<br>

```ts
// markdown.config.ts

import { defineConfig } from '@sveltek/markdown'

export const markdownConfig = defineConfig({
  layouts: [
    {
      name: 'default',
      path: 'lib/content/layouts/default/layout.svelte', // Specifies the path to the layout file (required).
      plugins: {
        remark: [], // Specifies custom `remark` plugins at the layout-level (optional).
        rehype: [], // Specifies custom `rehype` plugins at the layout-level (optional).
      },
    },
    {
      name: 'blog',
      path: 'lib/content/layouts/blog/layout.svelte',
    },
    // ...
  ],
})
```

```markdown
---
title: Page Title
layout: default
---
```

```markdown
---
title: Page Title
layout: blog
---
```

```markdown
---
layout: false
---
```

<br>

[← Back](../README.md)
