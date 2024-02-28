/* eslint-disable no-restricted-syntax */
import { once } from 'node:events'
import build from 'pino-abstract-transport'
import { SonicBoom } from 'sonic-boom'
import prettifyChunk from './prettify-chunk.js'

export default async function charm() {
  const destination = new SonicBoom({ dest: 1 })

  await once(destination, 'ready')

  return build(async (source) => {
    for await (const chunk of source) {
      const toDrain = destination.write(`${prettifyChunk(chunk)}\n`)

      if (!toDrain) {
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
