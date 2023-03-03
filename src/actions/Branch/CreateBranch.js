import { text, confirm, isCancel, outro } from '@clack/prompts'
import colors from 'picocolors'
import { gitCreateBranch } from '../../git.js'
import { exitProgram } from '../../utils.js'

export async function CreateBranch () {
  const branchName = await text(
    {
      message: colors.cyan('Enter the name of the branch: '),
      validate: (value) => {
        if (value.length === 0) {
          return colors.red('The branch name cannot be empty.')
        }
      }
    }
  )
  const cleanBranchName = branchName.trim()
  const confirmCreateBranch = await confirm(
    {
      message: colors.cyan(`Are you sure you want to create a branch named: ${cleanBranchName}`)
    }
  )
  if (isCancel(confirmCreateBranch)) exitProgram()
  if (!confirmCreateBranch) {
    outro(colors.yellow('The branch has not been created.'))
    process.exit(0)
  }

  await gitCreateBranch(cleanBranchName)
  outro(colors.green(`
        ¡ ✅ Branch Created !
  
  `))
}
