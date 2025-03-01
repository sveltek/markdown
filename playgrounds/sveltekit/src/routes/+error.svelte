<script lang="ts">
  import { page } from '$app/state'
</script>

<div id="__error">
  <h1>{page.status}</h1>
  <h3>{page.error?.message}</h3>
</div>
