import { once } from 'node:events'
import build from 'pino-abstract-transport'
import SonicBoom from 'sonic-boom'
import prettify from './prettify.ts'

export interface Object extends Record<PropertyKey, unknown> {
  err?: unknown
  hostname?: string
  level: number | string
  msg?: unknown
  pid?: number
  time: number
}

export interface Options {
  destination?: number | string
  nestedKey?: string
  sync?: boolean
}

export default async function charm(options: Options = {}) {
  const destination = new SonicBoom({
    dest: options.destination ?? 1,
    sync: options.sync ?? false
  })

  await once(destination, 'ready')

  return build(async (source) => {
    for await (const object of source) {
      const toDrain = !destination.write(`${prettify(object as Object, options)}\n`)

      if (toDrain) {
        await once(destination, 'drain')
      }
    }
  }, {
    async close() {
      destination.end()

      await once(destination, 'close')
    }
  })
}
