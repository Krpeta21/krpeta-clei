import { addRemote, gitInit } from '../git.js'
import { text, outro, confirm, isCancel } from '@clack/prompts'
import colors from 'picocolors'
import { exitProgram } from '../utils.js'

export async function InitAction () {
  const confirmGitInit = await confirm({
    initialValue: true,
    message: `${colors.cyan('¿Quieres iniciar el repositorio en esta carpeta?')}`
  })

  if (isCancel(confirmGitInit)) exitProgram({ message: 'No se ha iniciado el repositorio.' })

  if (!confirmGitInit) {
    outro(colors.yellow('No se ha iniciado el repositorio.'))
    process.exit(0)
  }

  await gitInit()

  const confirmAddRemote = await confirm({
    initialValue: true,
    message: `${colors.cyan('¿Quieres agregar la URL de tu repositorio?')}`
  }
  )
  if (isCancel(confirmAddRemote)) exitProgram({ message: 'No se ha añadido la url del repositorio.' })
  if (!confirmAddRemote) {
    outro(colors.yellow('No se ha añadido la url del repositorio.'))
    process.exit(0)
  }
  const urlRepo = await text({
    message: colors.cyan('Introduce la URL del repositorio del commit:'),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red('La URL no puede estar vacía.')
      }
    }
  })
  if (isCancel(urlRepo)) exitProgram({ message: 'No se ha añadido la url del repositorio.' })
  await addRemote(urlRepo)
  outro(
    colors.green('¡Gracias por usar el asistente!')
  )
}
