export const escapeSvelte = (value: string): string =>
  value
    .replace(
      /[{}`]/g,
      (v) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' })[v] || v,
    )
    .replace(/\\([trn])/g, '&#92;$1')
