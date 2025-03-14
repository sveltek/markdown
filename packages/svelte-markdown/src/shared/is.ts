// Inspired by Hypernym Utils, v3.4.3, MIT License, https://github.com/hypernym-studio/utils

export const isString = (v: any): v is string => typeof v === 'string'

export const isObject = (v: any): v is object =>
  Object.prototype.toString.call(v).slice(8, -1) === 'Object'

export const isArray = (v: any): v is any[] => Array.isArray(v)

export const isFalse = (v: any): v is false => v === false
