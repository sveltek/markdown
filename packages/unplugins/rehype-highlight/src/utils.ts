import { isString, isArray } from '@hypernym/utils'
import type { Hast } from '@sveltek/markdown'
import type { HighlighterData } from './types'

const getLang = (el: Hast.Element): string | undefined =>
  (isArray(el.properties.className) &&
    isString(el.properties.className[0]) &&
    el.properties.className[0]?.replace('language-', '')) ||
  undefined

const getMeta = (el: Hast.Element): string | undefined =>
  (el.data as Hast.ElementData & { meta?: string })?.meta || undefined

const getCode = (el: Hast.Element): string | undefined =>
  el.children[0]?.type === 'text'
    ? el.children[0].value.replace(/\n$/, '')
    : undefined

export const getHighlighterData = (el: Hast.Element): HighlighterData => {
  return {
    lang: getLang(el),
    meta: getMeta(el),
    code: getCode(el),
  }
}
