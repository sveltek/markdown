import { cwd } from 'node:process'
import { resolve } from 'node:path'
import { cp } from 'node:fs/promises'

/**
 * Copies `README.md` file from the `workspace` to the `package` before publishing.
 */
async function copyReadme(): Promise<void> {
  try {
    const root = cwd()

    await cp(resolve(root, '../../README.md'), resolve(root, './README.md'), {
      recursive: true,
    })

    console.log('Copying completed successfully!')
  } catch (err) {
    console.error('Copying failed!', err)
    throw err
  }
}

copyReadme()
