import {
  outro,
  confirm,
  isCancel,
  text
} from '@clack/prompts'

import colors from 'picocolors'
import { trytm } from '@bdsqqq/try'

import { getChangedFiles, getStagedFiles, gitPush } from '../git.js'
import { exitProgram } from '../utils.js'

export async function PushAction () {
  const [errorChangedFiles] = await trytm(getChangedFiles())
  const [errorStagedFiles] = await trytm(getStagedFiles())

  if (errorChangedFiles ?? errorStagedFiles) {
    outro(colors.red('Error: Comprueba que estás en un repositorio de git'))
    process.exit(1)
  }
  const confirmGitPush = await confirm({
    initialValue: true,
    message: `${colors.cyan('¿Quieres hacer push al commit?')}`
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
}
