import icon from '@/assets/icons/calendar/calendar.svg'

type CalendarIconProps = { width: number, height: number }

function CalendarIcon(props: CalendarIconProps) {
  
  return (
    <img src={icon} width={props.width} height={props.height} />
  )
}

export default CalendarIcon
