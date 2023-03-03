import {
  outro,
  text,
  confirm,
  isCancel
} from '@clack/prompts'
import colors from 'picocolors'
import { changeRemoteUrl } from '../git.js'
import { exitProgram } from '../utils.js'
export async function ChangeLinkRemote () {
  const remoteUrl = await text(
    {
      message: colors.cyan('Enter the repository URL: '),
      validate: (value) => {
        if (value.length === 0) {
          return colors.red('The URL cannot be empty.')
        }
      }
    }
  )
  if (isCancel(remoteUrl)) exitProgram()

  const confirmChange = await confirm({
    initialValue: true,
    message: `${colors.cyan(`Do you want to add ${remoteUrl} as the address of the repository?`)}`
  })

  if (isCancel(confirmChange)) return exitProgram()
  if (!confirmChange) {
    outro(colors.yellow('URL not changed.'))
    process.exit(0)
  }

  await changeRemoteUrl(remoteUrl)
  outro(
    colors.green(`
      ¡ ✅ URL change done !
      `)
  )
}
