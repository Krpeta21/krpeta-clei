import { isCancel, confirm, outro, select } from '@clack/prompts'
import { gitDeleteBranch, gitShowBranchs } from '../../git.js'
import colors from 'picocolors'
import { exitProgram } from '../../utils.js'
export async function DeleteBranch () {
  const branchs = await gitShowBranchs()
  const arrayBranchs = branchs.split('\n')

  const branchToDelete = await select(
    {
      message: colors.cyan('Selecciona la rama a la que quieres hacer push: '),
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
    message: colors.cyan(`¿Estas seguro que deseas eliminar la rama con nombre "${colors.red(colors.bold(`${branchToDelete}`))}"`)
  })
  if (isCancel(confirmDeleteBranch)) exitProgram()
  if (!confirmDeleteBranch) return colors.yellow('No se ha eliminado la rama')
  await gitDeleteBranch(branchToDelete)
  outro(colors.green(`
        ¡ ✅ Rama Eliminada 🗑️!
  ¡Gracias por usar el asistente!
  `))
}
