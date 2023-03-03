import {
  outro,
  text,
  select,
  confirm,
  multiselect,
  isCancel
} from '@clack/prompts'

import colors from 'picocolors'
import { trytm } from '@bdsqqq/try'
import { COMMIT_TYPES } from '../types/commit-types.js'
import { getChangedFiles, getStagedFiles, gitAdd, gitCommit } from '../git.js'

import { exitProgram } from '../utils.js'

export async function CommitAction () {
  const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles())
  const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles())

  if (errorChangedFiles ?? errorStagedFiles) {
    outro(colors.red('Error: Check that you are in a git repository.'))
    process.exit(1)
  }

  if (stagedFiles.length === 0 && changedFiles.length > 0) {
    const files = await multiselect({
      message: colors.cyan('Select the files you want to add to the commit:'),
      options: changedFiles.map(file => ({
        value: file,
        label: file
      }))
    })

    if (isCancel(files)) exitProgram()

    await gitAdd({ files })
  }

  const commitType = await select({
    message: colors.cyan('Select the type of commit: '),
    options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
      value: key,
      label: `${value.emoji} ${key.padEnd(10, ' ')} · ${value.description}`
    }))
  })

  if (isCancel(commitType)) exitProgram()

  const commitMessage = await text({
    message: colors.cyan('Enter the commit message: '),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red('The message cannot be empty.')
      }

      if (value.length > 50) {
        return colors.red('The message cannot be longer than 100 characters.')
      }
    }
  })

  if (isCancel(commitMessage)) exitProgram()

  const { emoji, release } = COMMIT_TYPES[commitType]

  let breakingChange = false
  if (release) {
    breakingChange = await confirm({
      initialValue: false,
      message: `${colors.cyan('Does this commit have changes that break previous compatibility?')}
      
  ${colors.yellow('If the answer is yes, you should create a commit with the type "BREAKING CHANGE" and when you release a major version will be published.')}`
    })

    if (isCancel(breakingChange)) exitProgram()
  }

  let commit = `${emoji} ${commitType}: ${commitMessage}`
  commit = breakingChange ? `${commit} [breaking change]` : commit

  const shouldContinue = await confirm({
    initialValue: true,
    message: `${colors.cyan('Do you want to create the commit with the following message?')}
    ${colors.green(colors.bold(commit))}
    ${colors.cyan('Do you confirm?')}`
  })

  if (isCancel(shouldContinue)) exitProgram()

  if (!shouldContinue) {
    outro(colors.yellow('Commit not created.'))
    process.exit(0)
  }

  await gitCommit({ commit })
  outro(
    colors.green(`
    ¡ ✅ Commit succefully !
    `)
  )
}
