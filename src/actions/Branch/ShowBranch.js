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
`Las ramas son:
${branchs}`)
}
¿Deseas hacer alguna accion con las ramas?
    `)
  })
  if (isCancel(confirmAction)) exitProgram()
  if (!confirmAction) {
    outro(colors.yellow('Se ha cerrado el programa.'))
    process.exit(0)
  }
  await BranchAction()
}
