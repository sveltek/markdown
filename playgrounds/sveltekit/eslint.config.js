import { jsConfig, tsConfig, ignoresConfig } from '@hypernym/eslint-config'
import { svelteConfig } from '@hypernym/eslint-config/svelte'

/** @type {import("eslint").Linter.Config[]} */
export default [jsConfig, tsConfig, svelteConfig, ignoresConfig]
