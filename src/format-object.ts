import jsTokens from 'js-tokens'
import { inspect, styleText } from 'node:util'

export default function formatObject(object: object | unknown[]) {
  const string = inspect(object, { depth: null, sorted: true })

  return [...jsTokens(string)]
    .map(({ type, value }) => {
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      switch (type) {
        case 'IdentifierName':
          return styleText(['white'], value)
        case 'NumericLiteral':
          return styleText(['yellowBright'], value)
        case 'Punctuator':
          return styleText(['gray'], value)
        case 'StringLiteral':
          return styleText(['greenBright'], value)
        default:
          return value
      }
    })
    .join('')
}
