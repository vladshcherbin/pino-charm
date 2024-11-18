import { styleText } from 'node:util'

const formatter = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'medium',
  hour12: false
})

export default function formatTime(time: number) {
  return styleText('gray', formatter.format(new Date(time)))
}
