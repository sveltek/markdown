<h1 align="center">@sveltek/remark-reading-stats</h1>

<p align="center">A custom Remark plugin that creates reading stats.</p>

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

- Helps estimate how long it will take to read content
- Stores reading details to frontmatter for easy access
- Focuses on simplicity and performance

## Installation

```sh
# via pnpm
pnpm add -D @sveltek/remark-reading-stats
```

```sh
# via npm
npm install -D @sveltek/remark-reading-stats
```

## Usage

### Global

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkReadingStats } from '@sveltek/remark-reading-stats'

svelteMarkdown({
  plugins: {
    remark: [[remarkReadingStats, options]],
  },
})
```

### Layouts

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkReadingStats } from '@sveltek/remark-reading-stats'

svelteMarkdown({
  layouts: [
    {
      name: 'layout-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        remark: [[remarkReadingStats, options]],
      },
    },
  ],
})
```

### Entries

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkReadingStats } from '@sveltek/remark-reading-stats'

svelteMarkdown({
  entries: [
    {
      name: 'entry-name',
      path: 'path/to/custom/file.svelte',
      plugins: {
        remark: [[remarkReadingStats, options]],
      },
    },
  ],
})
```

## Example

Import and pass the plugin directly into the array.

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import { remarkReadingStats } from '@sveltek/remark-reading-stats'

svelteMarkdown({
  plugins: {
    remark: [remarkReadingStats],
  },
})
```

It is also possible to further customize the plugin as needed.

```ts
import { svelteMarkdown } from '@sveltek/markdown'
import {
  remarkReadingStats,
  type RemarkReadingStatsOptions,
} from '@sveltek/remark-reading-stats'

const remarkReadingStatsOptions: RemarkReadingStatsOptions = {
  wordsPerMinute: 300, // Specifies how many words per minute an average reader can read
}

svelteMarkdown({
  plugins: {
    remark: [[remarkReadingStats, remarkReadingStatsOptions]],
  },
})
```

## Options

### wordsPerMinute

- Type: `number`
- Default: `200`

Specifies how many words per minute an average reader can read.

```ts
{
  wordsPerMinute: 200,
}
```

## License

Developed in 🇭🇷 Croatia, © Sveltek.

Released under the [MIT](LICENSE.txt) license.
