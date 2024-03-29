import { inspect } from 'node:util'
import cleanStack from 'clean-stack'
import { gray, greenBright, redBright, white, yellowBright } from 'colorette'
import extractStack from 'extract-stack'
import indentString from 'indent-string'
import isPlainObject from 'is-plain-obj'
import type { SerializedError } from 'pino'
import prettyMilliseconds from 'pretty-ms'
import colorizeLevel from './colorize-level.js'

type Chunk = {
  duration?: number
  err: SerializedError
  level: number
  msg: string
  time: number
}

export default function prettifyChunk(chunk: Chunk) {
  const { duration, err, level, msg, time, ...rest } = chunk
  const properties = Object.entries(rest)
  const output = []
  const message = []
  const canInlineProperties = !err
    && properties.length <= 3
    && !properties.some(([, value]) => isPlainObject(value))

  message.push(colorizeLevel(level)('>'))

  if (err) {
    message.push(redBright(`${err.type}: ${msg || err.message}`))
  } else if (msg) {
    if (level === 35) {
      message.push(greenBright(msg))
    } else if (level === 40) {
      message.push(yellowBright(msg))
    } else if ([50, 60].includes(level)) {
      message.push(redBright(msg))
    } else {
      message.push(msg)
    }
  }

  if (properties.length && canInlineProperties) {
    properties.forEach(([property, value]) => {
      message.push(`${gray(`${property}:`)} ${white(String(value))}`)
    })
  }

  if (duration !== undefined) {
    message.push(gray(prettyMilliseconds(duration)))
  }

  output.push(message.join(' '))

  if (properties.length && !canInlineProperties) {
    properties.forEach(([property, value]) => {
      if (isPlainObject(value)) {
        output.push(indentString(gray(`${property}:`), 2))
        output.push(indentString(inspect(value, { compact: false, depth: null, sorted: true }), 4))
      } else {
        output.push(indentString(`${gray(`${property}:`)} ${white(String(value))}`, 2))
      }
    })
  }

  if (err) {
    output.push(gray(extractStack(cleanStack(err.stack, { basePath: process.cwd() }))))
  }

  return output.join('\n')
}
