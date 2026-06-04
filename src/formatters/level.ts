import type { Object } from '../index.ts'
import styleText from '../utilities/style-text.ts'

export default function formatLevel(level: Object['level']) {
  switch (level) {
    case 10:
    case 'trace':
      return styleText(['bold', 'gray'], 'TRC')
    case 20:
    case 'debug':
      return styleText(['bold', 'blueBright'], 'DBG')
    case 30:
    case 'info':
      return styleText(['bold', 'greenBright'], 'INF')
    case 35:
    case 'notice':
      return styleText(['bold', 'greenBright'], 'NTC')
    case 40:
    case 'warn':
      return styleText(['bold', 'yellowBright'], 'WRN')
    case 50:
    case 'error':
      return styleText(['bold', 'redBright'], 'ERR')
    case 60:
    case 'fatal':
      return styleText(['bold', 'black', 'bgRed'], 'FTL')
    default:
      return styleText(['bold', 'whiteBright'], 'UNK')
  }
}
