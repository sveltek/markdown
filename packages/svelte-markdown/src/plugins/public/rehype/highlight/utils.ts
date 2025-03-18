import { isString, isArray } from '@/shared'
import type { Element } from 'hast'
import type { HighlighterData } from './types'

const getLang = (el: Element): string | undefined =>
  (isArray(el.properties.className) &&
    isString(el.properties.className[0]) &&
    el.properties.className[0]?.replace('language-', '')) ||
  undefined

const getMeta = (el: Element): string | undefined => el.data?.meta || undefined

const getCode = (el: Element): string | undefined =>
  el.children[0]?.type === 'text'
    ? el.children[0].value.replace(/\n$/, '')
    : undefined

export const getHighlighterData = (el: Element): HighlighterData => {
  return {
    lang: getLang(el),
    meta: getMeta(el),
    code: getCode(el),
  }
}
