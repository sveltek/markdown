---
title: About page
description: Svelte Markdown Preprocessor.
layout: false
specialElements: true
---

<svelte:head>

  <title>Custom Title - {title}</title>
  <meta name="description" content={`Custom Description - ${description}`} />
</svelte:head>

<script lang="ts">
  import { Button } from '$/components'
</script>

<style>
  p { 
    opacity: 0.6;
    font-family: monospace;
    font-size: 1.125rem;
  }
</style>

{description}

<Button />
