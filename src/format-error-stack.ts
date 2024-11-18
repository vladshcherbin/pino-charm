import { styleText } from 'node:util'
import cleanStack from 'clean-stack'
import extractStack from 'extract-stack'
import redent from 'redent'

export default function formatErrorStack(stack: string) {
  return styleText(
    'redBright',
    redent(extractStack(cleanStack(stack, { basePath: process.cwd() })), 2)
  )
}
