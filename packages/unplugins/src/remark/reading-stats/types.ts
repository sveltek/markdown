export interface ReadingStats {
  minutes: number
  words: number
  text: string
}

export interface ReadingStatsOptions {
  /**
   * Specifies how many words per minute an average reader can read.
   *
   * @default 200
   */
  wordsPerMinute?: number
}
