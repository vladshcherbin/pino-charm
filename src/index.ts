/* eslint-disable no-console, no-restricted-syntax */
import build from 'pino-abstract-transport'

export default async function pretty() {
  return build(async (source) => {
    for await (const object of source) {
      console.log(object)
    }
  })
}
