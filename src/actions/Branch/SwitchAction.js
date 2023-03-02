import { isCancel, select, outro } from '@clack/prompts'
import { gitShowBranchs, gitSwitchBranch } from '../../git.js'
import colors from 'picocolors'
import { exitProgram } from '../../utils.js'

export async function SwitchAction () {
  const branchs = await gitShowBranchs()
  const arrayBranchs = branchs.split('\n')
  const branchToSwitch = await select(
    {
      message: colors.cyan('Selecciona la rama a la que quieres cambiar: '),
      options: arrayBranchs.map((branch) => (
        {
          value: branch,
          label: branch
        }
      ))
    }
  )
  if (isCancel(branchToSwitch)) exitProgram()
  await gitSwitchBranch(branchToSwitch)
  outro(
    colors.green(`
    ¡ 🔀 Rama Cambiada a ${branchToSwitch}!
    ¡Gracias por usar el asistente!
    `)
  )
}
