import { preprocess, parse } from 'svelte/compiler'
import { unified } from 'unified'
import { VFile } from 'vfile'
import MagicString from 'magic-string'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { meta, isFalse, isObject } from '@/shared'
import { parseFile } from './file'
import { getLayoutData } from './layouts'
import { getEntryData } from './entries'
import { createSvelteModule } from './module'
import { createSvelteInstance } from './instance'
import {
  remarkSvelteHtml,
  rehypeRenderCode,
  rehypeCreateLayout,
  rehypeCreateComponents,
  rehypeHighlight,
} from '@/plugins'
import { usePlugins } from '@/plugins/utils'
import type { Processed } from 'svelte/compiler'
import type { FileData, CompileOptions } from './types'

export async function compile(
  source: string,
  {
    filename,
    config = {},
    htmlTag = true,
    module: optionsModule = true,
  }: CompileOptions,
): Promise<Processed> {
  const {
    preprocessors = [],
    plugins: { remark = [], rehype = [] } = {},
    highlight = {},
    imports,
  } = config

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

  if (isFalse(data.frontmatter?.plugins?.remark)) data.plugins!.remark = []
  if (isFalse(data.frontmatter?.plugins?.rehype)) data.plugins!.rehype = []
  if (highlight) data.plugins?.rehype?.push([rehypeHighlight, highlight])

  const layout = getLayoutData(data, config)
  if (layout) {
    data.layout = layout
    data.dependencies?.push(layout.path)
    if (layout.plugins && isObject(data.frontmatter?.layout)) {
      if (isFalse(data.frontmatter?.layout?.plugins?.remark)) {
        layout.plugins.remark = []
      }
      if (isFalse(data.frontmatter?.layout?.plugins?.rehype)) {
        layout.plugins.rehype = []
      }
    }
  }

  const entry = getEntryData(data, config)
  if (entry) {
    if (entry.plugins && isObject(data.frontmatter?.entry)) {
      if (isFalse(data.frontmatter?.entry?.plugins?.remark)) {
        entry.plugins.remark = []
      }
      if (isFalse(data.frontmatter?.entry?.plugins?.rehype)) {
        entry.plugins.rehype = []
      }
    }
  }

  const processed = await unified()
    .use(remarkParse)
    .use(remarkSvelteHtml)
    .use(usePlugins(data.plugins?.remark))
    .use(usePlugins(layout?.plugins?.remark))
    .use(usePlugins(entry?.plugins?.remark))
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(usePlugins(data.plugins?.rehype))
    .use(usePlugins(layout?.plugins?.rehype))
    .use(usePlugins(entry?.plugins?.rehype))
    .use(rehypeRenderCode, { htmlTag })
    .use(rehypeCreateLayout)
    .use(rehypeCreateComponents)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(file)

  const { code, dependencies } = await preprocess(
    parsed.svelte + String(processed),
    preprocessors,
    { filename },
  )

  if (dependencies) data.dependencies?.push(...dependencies)

  const s = new MagicString(code)
  const { instance, module, css } = parse(code, { modern: true })

  const svelteModule = createSvelteModule(module, data)

  const svelteInstance = createSvelteInstance(instance, {
    filePath: file.path,
    layoutPath: layout?.path,
    imports,
  })
  if (instance) s.remove(instance.start, instance.end)

  if (layout) {
    let styles: string | undefined

    if (module) s.remove(module.start, module.end)
    if (css) {
      styles = s.original.substring(css.start, css.end)
      s.remove(css.start, css.end)
    }

    s.prepend(`<${meta.layoutName} {frontmatter}>\n`)
    s.append(`</${meta.layoutName}>\n`)

    if (styles) s.prepend(styles)
  }

  if (svelteInstance.content) s.prepend(svelteInstance.content)
  if (optionsModule) s.prepend(svelteModule.content)

  return {
    code: s.toString(),
    map: s.generateMap({ source: filename }),
    dependencies: data.dependencies,
  }
}
