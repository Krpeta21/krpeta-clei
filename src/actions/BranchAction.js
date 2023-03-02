import {
  outro,
  confirm,
  isCancel,
  text,
  select
} from '@clack/prompts'
import colors from 'picocolors'
import { BRANCH_TYPES } from '../types/branch-types.js'
import { exitProgram } from '../utils.js'

export async function BranchAction () {
  const branchActions = await select(
    {
      message: colors.cyan('Selecciona la accion que quieres hacer: '),
      options: Object.entries(BRANCH_TYPES).map(([key, value]) => (
        {
          value: key,
          label: `${value.emoji} ${key.padEnd(10, ' ')} · ${value.description}`
        }
      ))
    }
  )
  if (isCancel(branchActions)) exitProgram({ message: 'Se ha cerrado el programa.' })
}
