import icon from '../../../assets/icons/calendar/calendar.svg'
import styles from './CalendarIcon.module.css'

// Types
import { CalendarIconProps } from './types'

function CalendarIcon({ width, height }: CalendarIconProps) {
  return (
    <img src={icon} width={width} height={height} className={styles.calendarIcon} />
  )
}

export default CalendarIcon
