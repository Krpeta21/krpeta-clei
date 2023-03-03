import { isCancel, select, outro } from '@clack/prompts'
import { gitShowBranchs, gitSwitchBranch } from '../../git.js'
import colors from 'picocolors'
import { exitProgram } from '../../utils.js'

export async function SwitchAction () {
  const branchs = await gitShowBranchs()
  const arrayBranchs = branchs.split('\n')
  const branchToSwitch = await select(
    {
      message: colors.cyan('Select the branch you want to switch to: '),
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
¡ 🔀 Branch switched to ${branchToSwitch}!
`)
  )
}
