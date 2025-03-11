<script lang="ts" module>
  export { h2, h3 } from './components'
</script>

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

<style>
  h1 {
    color: #ffffff;
    background-image: linear-gradient(33deg, #ffffff 0%, #000000 13%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
