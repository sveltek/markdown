<h1 align="center">@sveltek/rehype-shiki</h1>

<p align="center">A custom Rehype plugin for Shiki.</p>

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

- Provides super easy customization
- Includes preconfigured setup under the hood
- Dynamically loads languages ​​on demand
- Caches highlighter instance and other details
- Allows advanced control over highlighter data
- Uses officially recommended fine-grained modules
- Follows best performance practices and guides

## Installation

> [!NOTE]
>
> Package `@shikijs/themes` is optional if you plan to use custom theme.

```sh
# via pnpm
pnpm add -D @sveltek/rehype-shiki @shikijs/langs @shikijs/themes
```

```sh
# via npm
npm install -D @sveltek/rehype-shiki @shikijs/langs @shikijs/themes
```

## Usage

### Global

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { rehypeShiki } from '@sveltek/rehype-shiki'

svelteMarkdown({
  plugins: {
    rehype: [[rehypeShiki, options]],
  },
})
```

### Layouts

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { rehypeShiki } from '@sveltek/rehype-shiki'

svelteMarkdown({
  layouts: [
    {
      name: 'layout-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        rehype: [[rehypeShiki, options]],
      },
    },
  ],
})
```

### Entries

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { rehypeShiki } from '@sveltek/rehype-shiki'

svelteMarkdown({
  entries: [
    {
      name: 'entry-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        rehype: [[rehypeShiki, options]],
      },
    },
  ],
})
```

## Example

Minimal Shiki config requires `langs` and `themes` registration.

`Rehype Shiki` doesn't include any defaults so you can start from scratch. These are the official recommendations from the `Shiki` [docs](https://shiki.style/guide/best-performance#fine-grained-bundle) to avoid all pre-built bundles and only import what you really need.

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { rehypeShiki, type RehypeShikiOptions } from '@sveltek/rehype-shiki'

const rehypeShikiOptions: RehypeShikiOptions = {
  langs: [
    { id: 'html', lang: import('@shikijs/langs/html') },
    { id: 'css', lang: import('@shikijs/langs/css') },
    { id: 'js', lang: import('@shikijs/langs/javascript') },
    { id: 'ts', lang: import('@shikijs/langs/typescript') },
    { id: 'svelte', lang: import('@shikijs/langs/typescript') },
    // ...
  ],
  themes: [
    {
      id: 'light',
      name: 'github-light',
      theme: import('@shikijs/themes/github-light'),
    },
    {
      id: 'dark',
      name: 'github-dark',
      theme: import('@shikijs/themes/github-dark'),
    },
    // ...
  ],
}

svelteMarkdown({
  plugins: {
    rehype: [[rehypeShiki, rehypeShikiOptions]],
  },
})
```

## Options

### langs

- Type: `LanguageRegistration[]`
- Required: `true`

Specifies an array of language registration.

Also, language aliases are not enabled by default, meaning if the language `id` is `js`, aliases like `javascript`, `mjs`, `jsx` etc. will not work unless you explicitly specify them.

```ts
{
  langs: [
    { id: 'js', lang: import('@shikijs/langs/javascript') },
    {
      id: 'ts', // Specifies the lang ID (e.g. `js`, `ts`, `svelte`)
      lang: import('@shikijs/langs/typescript'), // Specifies the language input
      alias: ['typescript', 'mts', 'cts', 'tsx'], // Specifies a list of custom language aliases
    },
    // ...
  ]
}
```

#### Custom Langs

```ts
{
  langs: [
    { id: 'custom-lang-id', lang: customLang },
    // ...
  ]
}
```

### themes

- Type: `ThemeRegistration[]`
- Required: `true`

Specifies an array of theme registration.

```ts
{
  themes: [
    {
      id: 'light',
      name: 'github-light',
      theme: import('@shikijs/themes/github-light'),
    },
    {
      id: 'dark', // Specifies the theme ID (e.g. `light`, `dark`, `dim`)
      name: 'github-dark', // Specifies the theme name (e.g. `github-dark`, `github-light`)
      theme: import('@shikijs/themes/github-dark'), // Specifies the theme input
    },
    // ...
  ]
}
```

#### Custom Themes

```ts
{
  themes: [
    { id: 'custom-theme-id', name: 'custom-theme-name', theme: customTheme },
    // ...
  ]
}
```

### codeToHtml

- Type: `(data: HighlighterData) => CodeToHastOptions`
- Default: `undefined`

Specifies custom Shiki `codeToHtml` options.

```ts
{
  codeToHtml: () => ({
    defaultColor: 'dark',
    tabIndex: false,
    transformers: [
      // Shiki transformers...
    ],
  })
}
```

It also allows advanced customization with highlighter data params:

```ts
{
  codeToHtml: ({ code, lang, meta }) => {
    // Feel free to use custom `parsing` util for extracting `metadata`
    const metadata: Record<string, unknown> = parseMetadata(meta)

    const lineNumbers = metadata?.lineNumbers

    return {
      transformers: [
        {
          name: 'transformer-metadata',
          pre(node) {
            node.properties['data-theme'] = `theme-name`
            node.properties['data-lang'] = `${lang}`
            node.properties['data-line-numbers'] = `${lineNumbers}`
          },
          // ...
        },
        // ...
      ],
    }
  }
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
