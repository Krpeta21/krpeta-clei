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
  const confirmPushBranch = await confirm({
    message: colors.white(`¿Estas seguro que deseas hacer push a la rama "${colors.green(colors.bold(`${branchToSwitch}`))}"`)
  })
  if (isCancel(confirmPushBranch)) exitProgram()
  if (!confirmPushBranch) return colors.yellow('No se ha hecho push al repositorio.')

  await gitPush(branchToSwitch)
  outro(
    colors.green(`
   ¡ 🎉 Push realizado con exito 🎉!
     ¡Gracias por usar el asistente!
    `)
  )
}
