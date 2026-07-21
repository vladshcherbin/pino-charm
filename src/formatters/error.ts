import cleanStack from 'clean-stack'
import extractStack from 'extract-stack'
import { cwd } from 'node:process'
import { inspect } from 'node:util'
import redent from 'redent'
import type { Object } from '../index.ts'
import isPinoLikeError from '../utilities/is-pino-like-error.ts'
import styleText from '../utilities/style-text.ts'

const basePath = cwd()

export default function formatError(error: Exclude<Object['err'], undefined>, indent = 2, fromCause = false) {
  if (!isPinoLikeError(error)) {
    const message = inspect(error, { breakLength: Infinity, sorted: true })

    return [styleText('redBright', redent(`NonError: ${message}`, indent))]
  }

  const message = `${error.type}: ${error.message}`
  const stack = cleanStack(extractStack(error.stack), { basePath, pretty: true })

  const output: string[] = [
    styleText('redBright', redent(fromCause ? `[cause]: ${message}` : message, indent)),
    styleText('gray', redent(stack, indent + 2))
  ]

  if (error.cause) {
    output.push(...formatError(error.cause, indent + 4, true))
  }

  return output
}
