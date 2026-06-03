import cleanStack from 'clean-stack'
import extractStack from 'extract-stack'
import { cwd } from 'node:process'
import { styleText } from 'node:util'
import redent from 'redent'
import type { Object } from '../index.ts'

const basePath = cwd()

export default function formatError(error: NonNullable<Object['err']>, indent = 2, fromCause = false) {
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
