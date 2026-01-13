<h1 align="center">@sveltek/remark-toc</h1>

<p align="center">A custom Remark plugin that creates Table of Contents (Toc).</p>

<br>

> [!NOTE]
>
> While the **API** is solid and mostly complete, some changes may still occur before the first stable release.
>
> Ideas, [suggestions](https://github.com/sveltek/markdown/discussions) and code [contributions](https://github.com/sveltek/markdown/blob/main/.github/CONTRIBUTING.md) are welcome.
>
> If you find any issues or bugs, please [report](https://github.com/sveltek/markdown/issues/new/choose) them so the project can be improved.

<br>

## Core Concepts

- Automatically adds links with attributes to the headings
- Stores Toc items to frontmatter for easy access

## Installation

```sh
# via pnpm
pnpm add -D @sveltek/remark-toc
```

```sh
# via npm
npm install -D @sveltek/remark-toc
```

## Usage

### Global

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkToc } from '@sveltek/remark-toc'

svelteMarkdown({
  plugins: {
    remark: [[remarkToc, options]],
  },
})
```

### Layouts

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkToc } from '@sveltek/remark-toc'

svelteMarkdown({
  layouts: [
    {
      name: 'layout-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        remark: [[remarkToc, options]],
      },
    },
  ],
})
```

### Entries

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkToc } from '@sveltek/remark-toc'

svelteMarkdown({
  entries: [
    {
      name: 'entry-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        remark: [[remarkToc, options]],
      },
    },
  ],
})
```

## Example

Import and pass the plugin directly into the array.

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkToc } from '@sveltek/remark-toc'

svelteMarkdown({
  plugins: {
    remark: [remarkToc],
  },
})
```

It is also possible to further customize the plugin as needed.

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkToc, type RemarkTocOptions } from '@sveltek/remark-toc'

const remarkTocOptions: RemarkTocOptions = {
  depth: 4, // Specifies the maximum headings depth to be included in the table of content
  links: false, // Specifies whether headings include link tags
}

svelteMarkdown({
  plugins: {
    remark: [[remarkToc, remarkTocOptions]],
  },
})
```

## Options

### depth

- Type: `number`
- Default: `3`

Specifies the maximum headings depth to be included in the table of content.

```ts
{
  depth: 3,
}
```

### links

- Type: `boolean`
- Default: `true`

Specifies whether headings include link tags.

```ts
{
  links: true,
}
```

## License

Developed in 🇭🇷 Croatia, © Sveltek.

Released under the [MIT](LICENSE.txt) license.
