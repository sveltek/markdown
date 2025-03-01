import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const prerender = true

export const load: LayoutLoad = async ({ url }) => {
  if (!url.pathname) {
    error(404, {
      message: `Could not find ${url.pathname}.`,
    })
  }

  return {}
}
