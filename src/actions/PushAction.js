import {
  outro,
  confirm,
  isCancel,
  text
} from '@clack/prompts'

import colors from 'picocolors'

import { gitPush } from '../git.js'
import { exitProgram } from '../utils.js'

export async function PushAction () {
  const confirmGitPush = await confirm({
    initialValue: true,
    message: `${colors.cyan('¿Quieres hacer push al repositorio?')}`
  })

  if (isCancel(confirmGitPush)) exitProgram({ message: 'No se ha iniciado el repositorio.' })

  if (!confirmGitPush) {
    outro(colors.yellow('No se ha hecho push al repositorio.'))
    process.exit(0)
  }

  const branchName = await text({
    message: 'Introduce el nombre de la rama',
    validate: (value) => {
      if (value.length === 0) {
        return colors.red('El nombre de la rama no puede estar vacío')
      }
    }
  })

  await gitPush(branchName)
  outro(
    colors.green(`
    ¡ ✅ Push realizado!
    ¡Gracias por usar el asistente!
    `)
  )
}
