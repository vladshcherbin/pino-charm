import styleText from '../utilities/style-text.ts'

const formatter = new Intl.DateTimeFormat('en-US', {
  hour12: false,
  timeStyle: 'medium'
})

export default function formatTime(ms: number) {
  return styleText('gray', formatter.format(ms))
}
