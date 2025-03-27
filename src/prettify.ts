import { styleText } from 'node:util'
import isPlainObject from 'is-plain-obj'
import type { SerializedError } from 'pino'
import redent from 'redent'
import formatErrorStack from './format-error-stack.js'
import formatLevel from './format-level.js'
import formatMessage from './format-message.js'
import formatObject from './format-object.js'
import formatTime from './format-time.js'

type Chunk = {
  [key: string]: unknown
  err?: SerializedError
  hostname?: string
  level: number | string
  msg?: string
  pid?: number
  time: number
}

export default function prettify(chunk: Chunk) {
  const { err, hostname, level, msg, pid, time, ...rest } = chunk
  const properties = Object.entries(rest)
  const canInlineProperties = !err
    && properties.length <= 3
    && !properties.some(([, value]) => Array.isArray(value) || isPlainObject(value))
  const output = []
  const message = [
    formatTime(time),
    formatLevel(level)
  ]

  if (err) {
    message.push(styleText(['redBright'], `${err.type}: ${err.message}`))
  } else if (typeof msg !== 'undefined') {
    message.push(formatMessage(msg, level))
  }

  if (properties.length && canInlineProperties) {
    properties.forEach(([property, value]) => {
      message.push(`${styleText(['gray'], property)} ${styleText(['white'], String(value))}`)
    })
  }

  output.push(message.join(' '))

  if (properties.length && !canInlineProperties) {
    properties.forEach(([property, value]) => {
      if (Array.isArray(value) || isPlainObject(value)) {
        output.push(redent(styleText(['gray'], property), 2))
        output.push(redent(formatObject(value), 1, { indent: styleText(['gray'], '· '.padStart(4)) }))
      } else {
        output.push(redent(`${styleText(['gray'], property)} ${styleText(['white'], String(value))}`, 2))
      }
    })
  }

  if (err) {
    output.push(formatErrorStack(err.stack))
  }

  return output.join('\n')
}
