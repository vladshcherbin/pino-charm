import { styleText } from 'node:util'

export default function formatMessage(message: string, level: number) {
  switch (level) {
    case 35:
      return styleText('greenBright', message)
    case 40:
      return styleText('yellowBright', message)
    case 50:
    case 60:
      return styleText('redBright', message)
    default:
      return message
  }
}
