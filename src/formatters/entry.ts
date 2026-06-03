import { styleText } from 'node:util'

export default function formatEntry(property: string, value: string) {
  return `${styleText('gray', property)} ${styleText('white', value)}`
}
