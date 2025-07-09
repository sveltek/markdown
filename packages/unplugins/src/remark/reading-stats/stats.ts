import type { ReadingStats } from './types'

interface Options {
  wordsPerMinute?: number
}

const countWords = (text: string): number => (text.match(/\S+/g) || []).length

export const readingStats = (
  text: string,
  { wordsPerMinute = 200 }: Options = {},
): ReadingStats => {
  const words = countWords(text)
  const min = words / wordsPerMinute
  const minutes = min < 1 ? 1 : Math.round(min * 10) / 10

  return { minutes, words, text: `${minutes} min read` }
}
