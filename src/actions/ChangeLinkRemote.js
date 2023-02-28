import {
  outro,
  text,
  confirm,
  isCancel
} from '@clack/prompts'
import colors from 'picocolors'
import { addRemote } from '../git'
import { exitProgram } from '../utils'
export async function ChangeLinkRemote () {
  const remoteUrl = await text(
    {
      message: colors.cyan('Introduce la URL del repositorio: '),
      validate: (value) => {
        if (value.length === 0) {
          return colors.red('El mensaje no puede estar vacío')
        }
      }
    }
  )

  const confirmChange = await confirm({
    initialValue: true,
    message: `${colors.cyan(`Deseas añadir ${remoteUrl} como la direccion del repositorio?`)}`
  })

  if (isCancel(confirmChange)) return exitProgram({ message: 'Se ha cancelado esta accion.' })
  if (!confirmChange) {
    outro(colors.yellow('No se ha cambiado la URL'))
    process.exit(0)
  }

  await addRemote(remoteUrl)
  outro(
    colors.green(`
    ¡ ✅ Cambio de URL realizado!
    ¡Gracias por usar el asistente!
    `)
  )
}
