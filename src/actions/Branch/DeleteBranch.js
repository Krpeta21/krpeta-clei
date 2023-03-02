import { isCancel, text, confirm, outro } from '@clack/prompts'
import { gitDeleteBranch, gitShowBranchs } from '../../git.js'
import colors from 'picocolors'
import { exitProgram } from '../../utils.js'
export async function DeleteBranch () {
  const branchs = await gitShowBranchs()
  const branchToDelete = await text(
    {
      message: colors.cyan(`
        ${colors.green(
`Las ramas son:
${branchs}`)
}
        Introduce el nombre de la rama que deseas eliminar: 
            `),
      validate: value => {
        if (value.length === 0) return colors.red('El nombre de la rama no puede estar vacio.')
      }
    }
  )
  if (isCancel(branchToDelete)) exitProgram()
  const cleanBranchToDelete = branchToDelete.trim()
  const confirmDeleteBranch = await confirm({
    message: colors.cyan(`¿Estas seguro que deseas eliminar la rama con nombre "${colors.red(colors.bold(`${cleanBranchToDelete}`))}"`)
  })
  if (isCancel(confirmDeleteBranch)) exitProgram()
  if (!confirmDeleteBranch) return colors.yellow('No se ha eliminado la rama')
  await gitDeleteBranch(cleanBranchToDelete)
  outro(colors.green(`
        ¡ ✅ Rama Eliminada !
  ¡Gracias por usar el asistente!
  `))
}
