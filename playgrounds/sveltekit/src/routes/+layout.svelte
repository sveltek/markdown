<script lang="ts">
  import { HeaderMain } from '$/components'
  import '$/styles/app.css'

  let { children } = $props()
</script>

<div id="__default">
  <HeaderMain />
  {@render children()}
</div>
