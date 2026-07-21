import { readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, mock, test } from 'node:test'
import pino, { type LoggerOptions } from 'pino'
import charm from '../src/index.ts'

const destination = join(import.meta.dirname, 'output.log')
const options: LoggerOptions = { base: { pid: 69 }, level: 'trace' }

beforeEach(() => {
  mock.timers.enable({ apis: ['Date'], now: 1522431328992 })
})

afterEach(async () => {
  mock.timers.reset()

  await rm(destination)
})

await describe('Levels', async () => {
  await test('Trace', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.trace('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Debug', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.debug('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Info', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.info('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Warn', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.warn('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Error', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.error('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Fatal', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.fatal('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Unknown', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino({ base: { pid: 69 }, customLevels: { random: 45 } }, transport)

    logger.random('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })
})

await describe('Messages', async () => {
  await test('String', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.info('Application started')

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Number', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.info(10_000)

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Null', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.info(null)

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Structured', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.info({
      brand: 'Mercedes-Benz',
      contacts: {
        phone: '+123'
      },
      model: 'GLC Coupe',
      multimedia: [
        'aux',
        'usb'
      ],
      onSale: true,
      price: 130_000
    })

    assert.snapshot(await readFile(destination, 'utf-8'))
  })
})

await describe('Errors', async () => {
  await test('Direct', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.error(new Error('Unknown user'))

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Structured', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.error({ err: new Error('Unknown payment') })

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Cause', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(
      { base: { pid: 69 }, serializers: { err: pino.stdSerializers.errWithCause } },
      transport
    )

    logger.error(new Error('Unknown brand', { cause: new Error('Rejection') }))

    assert.snapshot(await readFile(destination, 'utf-8'))
  })

  await test('Non-error', async ({ assert }) => {
    const transport = await charm({ destination, sync: true })
    const logger = pino(options, transport)

    logger.error({ err: 'Unknown brand' })
    logger.fatal({ err: null })

    assert.snapshot(await readFile(destination, 'utf-8'))
  })
})

await describe('Options', async () => {
  await test('Nested key', async ({ assert }) => {
    const transport = await charm({ destination, nestedKey: 'context', sync: true })
    const logger = pino({ ...options, nestedKey: 'context' }, transport)

    logger.info({ port: 3000, time: true }, 'Server started')
    logger.warn('Retrying request...')
    logger.error(new Error('Unknown brand'))

    assert.snapshot(await readFile(destination, 'utf-8'))
  })
})
