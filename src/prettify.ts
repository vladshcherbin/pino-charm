import { inspect } from 'node:util'
import redent from 'redent'
import type { Object, Options } from './index.ts'
import formatEntry from './formatters/entry.ts'
import formatError from './formatters/error.ts'
import formatLevel from './formatters/level.ts'
import formatMessage from './formatters/message.ts'
import formatTime from './formatters/time.ts'
import parseObject from './utilities/parse-object.ts'

export default function prettify(object: Object, options: Options) {
  const { context, error, level, msg, time } = parseObject(object, options)
  const output: string[] = []
  const message: string[] = [
    formatTime(time),
    formatLevel(level)
  ]

  if (typeof msg !== 'undefined') {
    message.push(formatMessage(object))
  }

  const properties = Object.entries(context)
  const structuredProperties = new Map<string, string>()

  if (properties.length) {
    for (const [property, value] of properties) {
      const formattedValue = inspect(value, {
        compact: false,
        depth: Infinity,
        sorted: true
      })

      if (formattedValue.includes('\n')) {
        structuredProperties.set(property, formattedValue)
      } else {
        message.push(formatEntry(property, formattedValue))
      }
    }
  }

  output.push(message.join(' '))

  if (structuredProperties.size) {
    structuredProperties.forEach((value, property) => {
      output.push(redent(formatEntry(property, value), 2))
    })
  }

  if (typeof error !== 'undefined') {
    output.push(...formatError(error))
  }

  return output.join('\n')
}
