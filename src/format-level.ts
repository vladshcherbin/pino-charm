import { styleText } from 'node:util'

export default function formatLevel(level: number) {
  switch (level) {
    case 10:
      return styleText(['gray', 'bold'], 'TRC')
    case 20:
      return styleText(['blueBright', 'bold'], 'DBG')
    case 30:
      return styleText(['greenBright', 'bold'], 'INF')
    case 35:
      return styleText(['greenBright', 'bold'], 'NTC')
    case 40:
      return styleText(['yellowBright', 'bold'], 'WRN')
    case 50:
      return styleText(['redBright', 'bold'], 'ERR')
    case 60:
      return styleText(['bgRedBright', 'whiteBright', 'bold'], 'FTL')
    default:
      return styleText(['whiteBright', 'bold'], 'UNK')
  }
}
