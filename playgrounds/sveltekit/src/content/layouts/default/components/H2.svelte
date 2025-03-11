<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  let { children }: HTMLAttributes<HTMLHeadingElement> = $props()
</script>

<h2 style="text-decoration: underline dotted;">{@render children?.()}</h2>
