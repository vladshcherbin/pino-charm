import { styleText } from 'node:util'

const formatter = new Intl.DateTimeFormat('en-US', {
  hour12: false,
  timeStyle: 'medium'
})

export default function formatTime(time: number) {
  return styleText(['gray'], formatter.format(new Date(time)))
}
