<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    frontmatter: {
      layout?: string | false
      title?: string
    }
  }

  let { children, frontmatter }: Props = $props()
</script>

<svelte:head>
  <title>{frontmatter.title}</title>
</svelte:head>

<h1>{frontmatter.title}</h1>

<div id={frontmatter.layout ? `content-${frontmatter.layout}` : ''}>
  {@render children?.()}
</div>
