import { preprocess, parse } from 'svelte/compiler'
import { unified } from 'unified'
import { VFile } from 'vfile'
import MagicString from 'magic-string'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { meta } from '@/utils'
import { parseFile } from './file'
import { getLayoutData } from './layouts'
import { createSvelteModule } from './module'
import { createSvelteInstance } from './instance'
import {
  rehypeRenderCode,
  rehypeCreateLayout,
  rehypeCreateComponents,
} from '@/plugins/internal/rehype'
import { remarkSvelteHtml } from '@/plugins/internal/remark'
import type { Processed } from 'svelte/compiler'
import type { FileData, CompileOptions } from './types'

export async function compile(
  source: string,
  { filename, config = {} }: CompileOptions,
): Promise<Processed> {
  const { preprocessors = [], plugins: { remark = [], rehype = [] } = {} } =
    config

  const file = new VFile({
    value: source,
    path: filename,
    data: {
      preprocessors,
      plugins: { remark, rehype },
      dependencies: [],
      frontmatter: {},
    },
  })

  const parsed = parseFile(file, config)

  const data = file.data as FileData

  const layout = getLayoutData(data, config)

  if (layout) {
    data.layout = layout
    data.dependencies?.push(layout.path)
    if (layout.plugins?.remark) {
      data.plugins?.remark?.push(...layout.plugins.remark)
    }
    if (layout.plugins?.rehype) {
      data.plugins?.remark?.push(...layout.plugins.rehype)
    }
  }

  const processed = await unified()
    .use(remarkParse)
    .use(remarkSvelteHtml)
    .use(data.plugins!.remark!)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(data.plugins!.rehype!)
    .use(rehypeRenderCode)
    .use(rehypeCreateLayout)
    .use(rehypeCreateComponents)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(file)

  const preprocessed = await preprocess(
    parsed.svelte + String(processed),
    preprocessors,
    { filename },
  )

  const { code, dependencies } = preprocessed
  if (dependencies) data.dependencies?.push(...dependencies)

  const s = new MagicString(code)
  const { instance, module, css } = parse(code, { modern: true })

  const svelteModule = createSvelteModule(module, data)

  if (layout) {
    let styles: string | undefined

    const svelteInstance = createSvelteInstance(
      instance,
      file.path,
      layout.path,
    )

    if (instance) s.remove(instance.start, instance.end)
    if (module) s.remove(module.start, module.end)
    if (css) {
      styles = s.original.substring(css.start, css.end)
      s.remove(css.start, css.end)
    }

    s.prepend(`<${meta.layoutName} {frontmatter}>\n`)
    s.append(`</${meta.layoutName}>\n`)

    if (styles) s.prepend(styles)
    s.prepend(svelteInstance.content)
  }

  s.prepend(svelteModule.content)

  return {
    code: s.toString(),
    map: s.generateMap({ source: filename }),
    dependencies: data.dependencies,
  }
}
