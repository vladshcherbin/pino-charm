import { inspect, styleText } from 'node:util'
import jsTokens from 'js-tokens'

export default function formatObject(object: object | unknown[]) {
  const string = inspect(object, { depth: null, sorted: true })

  return [...jsTokens(string)]
    .map(({ type, value }) => {
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      switch (type) {
        case 'Punctuator':
          return styleText(['gray'], value)
        case 'NumericLiteral':
          return styleText(['yellowBright'], value)
        case 'StringLiteral':
          return styleText(['greenBright'], value)
        case 'IdentifierName':
          return styleText(['white'], value)
        default:
          return value
      }
    })
    .join('')
}
