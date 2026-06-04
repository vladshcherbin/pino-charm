import styleText from '../utilities/style-text.ts'

export default function formatEntry(property: string, value: string) {
  return `${styleText('gray', property)} ${styleText('white', value)}`
}
