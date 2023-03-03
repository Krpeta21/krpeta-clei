import { outro } from '@clack/prompts'
import colors from 'picocolors'

export function exitProgram ({ code = 0, message = 'The program has been closed.' } = {}) {
  outro(colors.yellow(message))
  process.exit(code)
}
