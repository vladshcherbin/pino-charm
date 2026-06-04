import { inspect } from 'node:util'
import type { Object } from '../index.ts'
import styleText from '../utilities/style-text.ts'

export default function formatMessage({ level, msg }: Object) {
  const message = typeof msg === 'string'
    ? msg
    : inspect(msg, { breakLength: Infinity, numericSeparator: true, sorted: true })

  switch (level) {
    case 35:
    case 'notice':
      return styleText('greenBright', message)
    case 40:
    case 'warn':
      return styleText('yellowBright', message)
    case 50:
    case 60:
    case 'error':
    case 'fatal':
      return styleText('redBright', message)
    default:
      return message
  }
}
