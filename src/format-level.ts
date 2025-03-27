import { styleText } from 'node:util'

export default function formatLevel(level: number | string) {
  switch (level) {
    case 10:
    case 'trace':
      return styleText(['gray', 'bold'], 'TRC')
    case 20:
    case 'debug':
      return styleText(['blueBright', 'bold'], 'DBG')
    case 30:
    case 'info':
      return styleText(['greenBright', 'bold'], 'INF')
    case 35:
    case 'notice':
      return styleText(['greenBright', 'bold'], 'NTC')
    case 40:
    case 'warn':
      return styleText(['yellowBright', 'bold'], 'WRN')
    case 50:
    case 'error':
      return styleText(['redBright', 'bold'], 'ERR')
    case 60:
    case 'fatal':
      return styleText(['bgRedBright', 'whiteBright', 'bold'], 'FTL')
    default:
      return styleText(['whiteBright', 'bold'], 'UNK')
  }
}
