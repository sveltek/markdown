export const isFunction = (v: any): v is (...args: any[]) => unknown =>
  v instanceof Function
