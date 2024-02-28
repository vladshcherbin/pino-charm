import { blueBright, gray, greenBright, magentaBright, redBright, yellowBright } from 'colorette'

export default function colorizeLevel(level: number) {
  switch (level) {
    case 10:
      return blueBright
    case 20:
      return magentaBright
    case 30:
    case 35:
      return greenBright
    case 40:
      return yellowBright
    case 50:
    case 60:
      return redBright
    default:
      return gray
  }
}
