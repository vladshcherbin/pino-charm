import { inspect } from 'node:util'
import redent from 'redent'
import type { Object } from './index.ts'
import formatEntry from './formatters/entry.ts'
import formatError from './formatters/error.ts'
import formatLevel from './formatters/level.ts'
import formatMessage from './formatters/message.ts'
import formatTime from './formatters/time.ts'

export default function prettify(object: Object) {
  const { err, hostname, level, msg, pid, time, ...rest } = object
  const output: string[] = []
  const message: string[] = [
    formatTime(time),
    formatLevel(level)
  ]

  if (typeof msg !== 'undefined') {
    message.push(formatMessage(object))
  }

  const properties = Object.entries(rest)
  const structuredProperties = new Map<string, string>()

  if (properties.length) {
    for (const [property, value] of properties) {
      const formattedValue = inspect(value, {
        compact: false,
        depth: Infinity,
        numericSeparator: true,
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

  if (err) {
    output.push(...formatError(err))
  }

  return output.join('\n')
}
