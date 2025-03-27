import { styleText } from 'node:util'

export default function formatMessage(message: string, level: number | string) {
  switch (level) {
    case 35:
    case 'notice':
      return styleText(['greenBright'], message)
    case 40:
    case 'warn':
      return styleText(['yellowBright'], message)
    case 50:
    case 60:
    case 'error':
    case 'fatal':
      return styleText(['redBright'], message)
    default:
      return message
  }
}
