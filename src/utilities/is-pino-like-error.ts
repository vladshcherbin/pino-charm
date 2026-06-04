import type { SerializedError as IncorrectSerializedError } from 'pino'
import isPlainObject from 'is-plain-obj'

interface SerializedError extends Pick<IncorrectSerializedError, 'message' | 'stack' | 'type'> {
  cause?: SerializedError
}

export default function isPinoLikeError(error: unknown): error is SerializedError {
  return (
    isPlainObject(error)
    && typeof error.type === 'string'
    && typeof error.message === 'string'
    && typeof error.stack === 'string'
  )
}
