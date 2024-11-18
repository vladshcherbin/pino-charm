import { once } from 'node:events'
import type { SerializedError } from 'pino'
import build from 'pino-abstract-transport'
import boom from 'sonic-boom'
import prettify from './prettify.js'

type Chunk = {
  level: number
  time: number
  msg?: string
  err?: SerializedError
}

export default async function charm() {
  // eslint-disable-next-line import/no-named-as-default-member
  const destination = new boom.SonicBoom({ dest: 1, sync: false })

  await once(destination, 'ready')

  return build(async (source) => {
    for await (const chunk of source) {
      const writeSucceeded = destination.write(`${prettify(chunk as Chunk)}\n`)

      if (!writeSucceeded) {
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
