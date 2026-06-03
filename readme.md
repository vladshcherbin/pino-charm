# pino-charm

Minimal pino formatter.

![Screenshot](https://pub-4b2f9534df71465d982f8692a340f7b4.r2.dev/charm/screenshot.avif)

## About

`pino-charm` is a small pino transport for readable terminal logs. It keeps the output compact, adds colored levels and makes errors easier to scan.

## Installation

```bash
# pnpm
pnpm add pino-charm -D

# yarn
yarn add pino-charm -D

# npm
npm install pino-charm -D
```

## Usage

```ts
import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-charm'
  }
})

logger.debug('Starting server...')
logger.info({ port: 3000 }, 'Server started')
logger.warn({ duration: 1200, path: '/users' }, 'Slow request')
logger.error(new Error('Database connection failed'))
```

### Error causes

Use pino's `errWithCause` serializer to show the `cause` field for errors.

```ts
import pino from 'pino'

const logger = pino({
  serializers: {
    err: pino.stdSerializers.errWithCause
  },
  transport: {
    target: 'pino-charm'
  }
})
```

## Inspiration

Inspired by these lovely packages:

- [charmbracelet/log](https://github.com/charmbracelet/log)
- [pinojs/pino-pretty](https://github.com/pinojs/pino-pretty)
- [lrlna/pino-colada](https://github.com/lrlna/pino-colada)

## License

MIT
