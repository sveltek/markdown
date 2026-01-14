# Custom Components

<br>

```markdown
---
title: Page Title
---

<script lang="ts">
  import { Component } from '$lib/components'
</script>

<Component />

<Component prop="data" />

<Component>
  Children content
</Component>
```

```markdown
---
title: Page Title
---

<script lang="ts">
  import { Component } from '$lib/components'
</script>

::Component

::Component prop="data"

::Component
Children content
::
```

<br>

[← Back](../README.md)
