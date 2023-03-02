import { text, confirm, isCancel, outro } from '@clack/prompts'
import colors from 'picocolors'
import { gitCreateBranch } from '../../git.js'
import { exitProgram } from '../../utils.js'

export async function CreateBranch () {
  const branchName = await text(
    {
      message: colors.cyan('Introduce el nombre de la rama: '),
      validate: (value) => {
        if (value.length === 0) {
          return colors.red('El nombre de la rama no puede estar vacio.')
        }
      }
    }
  )
  const cleanBranchName = branchName.trim()
  const confirmCreateBranch = await confirm(
    {
      message: colors.cyan(`¿Estas seguro que quieres crear una rama con nombre: ${cleanBranchName}`)
    }
  )
  if (isCancel(confirmCreateBranch)) exitProgram()
  if (!confirmCreateBranch) {
    outro(colors.yellow('No se ha creado la rama.'))
    process.exit(0)
  }

  await gitCreateBranch(cleanBranchName)
  outro(colors.green(`
        ¡ ✅ Rama Creada !
  ¡Gracias por usar el asistente!
  `))
}
