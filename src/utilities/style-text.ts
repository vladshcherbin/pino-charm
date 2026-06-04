import { styleText as nodeStyleText } from 'node:util'

export default function styleText(...[format, text]: Parameters<typeof nodeStyleText>) {
  return nodeStyleText(format, text, { validateStream: false })
}
