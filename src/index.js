import {
  intro,
  select,
  isCancel
} from '@clack/prompts'
import colors from 'picocolors'

import { exitProgram } from './utils.js'

import { ACTIONS_TYPES } from './types/actions-types.js'

import { InitAction } from './actions/InitAction.js'
import { CommitAction } from './actions/CommitAction.js'
import { PushAction } from './actions/PushAction.js'
import { ChangeLinkRemote } from './actions/ChangeLinkRemote.js'
import { BranchAction } from './actions/Branch/BranchAction.js'

intro(
  colors.inverse(` Git Command Helper by ${colors.yellow(' @krpeta21 ')}`)
)

const actionType = await select({
  message: colors.cyan('Select the action you want to do:'),
  options: Object.entries(ACTIONS_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(10, ' ')} · ${value.description}`
  }))
})
if (isCancel(actionType)) exitProgram()

if (actionType === ACTIONS_TYPES.init.action) {
  await InitAction()
}
if (actionType === ACTIONS_TYPES.branch.action) {
  await BranchAction()
}
if (actionType === ACTIONS_TYPES.commit.action) {
  await CommitAction()
}
if (actionType === ACTIONS_TYPES.push.action) {
  await PushAction()
}
if (actionType === ACTIONS_TYPES.remote.action) {
  await ChangeLinkRemote()
}
