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
      message: colors.cyan('Select the branch you want to push: '),
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
    message: colors.white(`Are you sure you want to push to the branch? "${colors.green(colors.bold(`${branchToSwitch}`))}"`)
  })
  if (isCancel(confirmPushBranch)) exitProgram()
  if (!confirmPushBranch) return colors.yellow('The push has not been made.')

  await gitPush(branchToSwitch)
  outro(
    colors.green(`
   ¡ 🎉 Push made successfully 🎉!
    `)
  )
}
