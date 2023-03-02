import {
  outro,
  confirm,
  isCancel,
  select
} from '@clack/prompts'

import colors from 'picocolors'

import { gitPush, gitShowBranchs } from '../git.js'
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

  const branchs = await gitShowBranchs()
  const arrayBranchs = branchs.split('\n')

  const branchToSwitch = await select(
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
  if (isCancel(branchToSwitch)) exitProgram()

  await gitPush(branchToSwitch)
  outro(
    colors.green(`
    ¡ 🎉 Push realizado con exito 🎉!
¡Gracias por usar el asistente!
    `)
  )
}
