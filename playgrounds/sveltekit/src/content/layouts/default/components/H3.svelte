<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  let { children }: HTMLAttributes<HTMLHeadingElement> = $props()
</script>

<h3 style="text-decoration: underline wavy;">
  {@render children?.()}
</h3>
