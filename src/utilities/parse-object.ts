import type { Object, Options } from '../index.ts'

interface Context extends Record<PropertyKey, unknown> {
  err?: Object['err']
}

export default function parseObject(object: Object, options: Options) {
  const { err, hostname, level, msg, pid, time, ...rest } = object

  if (!options.nestedKey) {
    return { context: rest, error: err, level, msg, time }
  }

  const context = rest[options.nestedKey] ?? {}
  const { err: contextError, ...restContext } = context as Context

  return { context: restContext, error: contextError, level, msg, time }
}
