# Options

<br>

## extensions

- Type: `string[]`
- Default: `['.md']`

Specifies custom file extensions.

```ts
svelteMarkdown({
  extensions: ['.md'],
})
```

## preprocessors

- Type: `PreprocessorGroup[]`
- Default: `undefined`

Specifies a custom list of preprocessors that will be applied to a Svelte file.

```ts
svelteMarkdown({
  preprocessors: [vitePreprocess()],
})
```

## plugins

- Type: `{ remark: [], rehype: [] }`
- Default: `undefined`

Specifies the **top-level** plugins that will be used for all markdown files.

- **Lifecycle:** `plugins` → `layout.plugins` → `entry.plugins`

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
```

## layouts

- Type: `Layout[]`
- Default: `undefined`

Specifies a custom layout array.

Layout component serves as a wrapper for the markdown files, which means the page content is displayed via the component's children prop.

- **Lifecycle:** `plugins` → `layout.plugins` → `entry.plugins`

```ts
svelteMarkdown({
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

Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).

### File-level

```markdown
---
title: Page title
layout: blog
---
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
```

### Config-level

```ts
svelteMarkdown({
  frontmatter: {
    defaults: {
      layout: 'default',
    },
  },
})
```

## entries

- Type: `Entry[]`
- Default: `undefined`

Specifies a custom entry array.

Entry serves as a special configuration for markdown files, which means it is similar to layout but without the need to create a custom component file.

Allows unique and straightforward customization for an individual markdown file. An entry can be a page or a component.

- **Lifecycle:** `plugins` → `layout.plugins` → `entry.plugins`

```ts
svelteMarkdown({
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

Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).

### File-level

```markdown
---
title: Page title
entry: blog
---
```

Also, entry plugins can be disabled at the **file-level**:

```markdown
---
title: Page title
entry:
  name: blog
  plugins:
    remark: false # Disables remark entry plugins for this file only
    rehype: false # Disables rehype entry plugins for this file only
---
```

### Config-level

```ts
svelteMarkdown({
  frontmatter: {
    defaults: {
      entry: 'default',
    },
  },
})
```

## components

- Type: `Component[]`
- Default: `undefined`

Defines global components that can be used in all markdown files without manual setup.

Especially useful for some generic components like buttons, links, images, etc.

### Default import

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

```markdown
---
title: Home page
description: Svelte Markdown Preprocessor.
---

<GlobalButton></GlobalButton>
```

### Named import

```ts
svelteMarkdown({
  components: [
    {
      name: 'Link', // Specifies named import
      path: 'src/components/link/index.ts', // Specifies import path from the barrel file
      form: 'named', // Specifies the component import form
    },
    {
      name: 'Link as MainLink', // Specifies named alias
      path: 'src/components/link/index.ts',
      form: 'named',
    },
    {
      name: 'Tabs',
      path: 'npm-package', // Specifies import path from the external package
      form: 'named',
    },
    // ...
  ],
})
```

```markdown
---
title: Docs page
description: Get started with Svelte Markdown.
---

<Link></Link>

<MainLink></MainLink>

<Tabs></Tabs>
```

## frontmatter

- Type: `object`
- Default: `undefined`

Defines frontmatter custom options.

By default, frontmatter only supports the `YAML` format, but allows additional customization via parser.

### defaults

- Type: `Record<string, unknown>`
- Default: `undefined`

Specifies frontmatter global data to be applied to all markdown files.

```ts
svelteMarkdown({
  frontmatter: {
    defaults: {
      author: 'Sveltek',
    },
  },
})
```

### marker

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

### parser

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

## specialElements

- Type: `boolean`
- Default: `undefined`

Specifies support for parsing Svelte `special` elements such as [`svelte:head`](https://svelte.dev/docs/svelte/svelte-head) etc. in markdown files.

Can be enabled at the **top-level** (via config) or at the **file-level** (via frontmatter).

If you don't plan to use them in every markdown file, it is recommended to enable the option only on those pages where you really need it.

### File-level

```markdown
---
title: Page title
specialElements: true
---

<svelte:head>...</svelte:head>
```

### Config-level

```ts
svelteMarkdown({
  frontmatter: {
    defaults: {
      specialElements: true,
    },
  },
})
```

<br>

[← Back](../README.md)
