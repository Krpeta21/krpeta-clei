import { isCancel, confirm, outro, select } from '@clack/prompts'
import { gitDeleteBranch, gitShowBranchs } from '../../git.js'
import colors from 'picocolors'
import { exitProgram } from '../../utils.js'
export async function DeleteBranch () {
  const branchs = await gitShowBranchs()
  const arrayBranchs = branchs.split('\n')

  const branchToDelete = await select(
    {
      message: colors.cyan('Select the branch you want to delete: '),
      options: arrayBranchs.map((branch) => (
        {
          value: branch,
          label: branch
        }
      ))
    }
  )
  if (isCancel(branchToDelete)) exitProgram()

  const confirmDeleteBranch = await confirm({
    message: colors.cyan(`Are you sure you want to delete the named branch "${colors.red(colors.bold(`${branchToDelete}`))}"`)
  })
  if (isCancel(confirmDeleteBranch)) exitProgram()
  if (!confirmDeleteBranch) return colors.yellow('Branch not deleted')
  await gitDeleteBranch(branchToDelete)
  outro(colors.green(`
        ¡ ✅ Branch ${colors.red(`${branchToDelete}`)} Deleted 🗑️ !
  `))
}
