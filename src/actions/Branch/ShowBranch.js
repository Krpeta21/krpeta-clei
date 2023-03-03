import { confirm, outro, isCancel } from '@clack/prompts'
import colors from 'picocolors'
import { gitShowBranchs } from '../../git.js'
import { exitProgram } from '../../utils.js'
import { BranchAction } from './BranchAction.js'

export async function ShowBranch () {
  const branchs = await gitShowBranchs()
  const confirmAction = await confirm({
    message: colors.cyan(`
${colors.green(
`The branches are: 
${branchs}
`)
}
Do you want to do something with the branches?
    `)
  })
  if (isCancel(confirmAction)) exitProgram()
  if (!confirmAction) {
    outro(colors.yellow('The program has been closed.'))
    process.exit(0)
  }
  await BranchAction()
}
