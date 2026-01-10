<h1 align="center">@sveltek/rehype-highlight</h1>

<p align="center">A custom Rehype plugin that creates code highlighter.</p>

<br>

> [!NOTE]
>
> While the **API** is solid and mostly complete, some changes may still occur before the first stable release.
>
> Ideas, [suggestions](https://github.com/sveltek/markdown/discussions) and code [contributions](https://github.com/sveltek/markdown/blob/main/.github/CONTRIBUTING.md) are welcome.
>
> If you find any issues or bugs, please [report](https://github.com/sveltek/markdown/issues/new/choose) them so the project can be improved.

<br>

## Installation

```sh
# via pnpm
pnpm add -D @sveltek/rehype-highlight
```

```sh
# via npm
npm install -D @sveltek/rehype-highlight
```

## Usage

### Global

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { rehypeHighlight } from '@sveltek/rehype-highlight'

svelteMarkdown({
  plugins: {
    rehype: [[rehypeHighlight, options]],
  },
})
```

### Layouts

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { rehypeHighlight } from '@sveltek/rehype-highlight'

svelteMarkdown({
  layouts: [
    {
      name: 'layout-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        rehype: [[rehypeHighlight, options]],
      },
    },
  ],
})
```

### Entries

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { rehypeHighlight } from '@sveltek/rehype-highlight'

svelteMarkdown({
  entries: [
    {
      name: 'entry-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        rehype: [[rehypeHighlight, options]],
      },
    },
  ],
})
```

## Options

### highlighter

- Type: `(data: HighlighterData) => Promise<string | undefined> | string | undefined`
- Required: `true`

Specifies custom syntax highlighter.

```ts
{
  highlighter: async ({ lang, code, meta }) => {
    const result = await codeToHtml(code, { lang })
    return result
  },
}
```

### root

- Type: `(node: Hast.Element) => void`
- Default: `undefined`

Specifies custom options for the `root` node (usually the `<pre>` tag).

```ts
{
  root: (node) => {
    node.tagName = 'div'
    node.properties.id = 'code-highlight'
    // ...
  }
}
```

## License

Developed in 🇭🇷 Croatia, © Sveltek.

Released under the [MIT](LICENSE.txt) license.
