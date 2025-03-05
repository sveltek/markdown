import { cwd } from 'node:process'
import { resolve } from 'node:path'
import { copy } from '@hypernym/utils/fs'

/**
 * Copies `README.md` file from the `workspace` to the `package` before publishing.
 */
async function copyReadme(): Promise<void> {
  try {
    const root = cwd()

    await copy(resolve(root, '../../README.md'), resolve(root, './README.md'))

    console.log('Copying completed successfully!')
  } catch (err) {
    console.error('Copying failed!', err)
    throw err
  }
}

copyReadme()
