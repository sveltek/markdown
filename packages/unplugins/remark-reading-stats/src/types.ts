export interface ReadingStats {
  minutes: number
  words: number
  text: string
}

export interface RemarkReadingStatsOptions {
  /**
   * Specifies how many words per minute an average reader can read.
   *
   * @default 200
   */
  wordsPerMinute?: number
}

export * from './'
