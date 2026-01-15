import styles from './RosterContainer.module.css'
import { useHandleRosterContainer } from './hooks'

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import * as Components from './components'

function RosterContainer({ rosters }: { rosters: AppTypes.RosterEntryInterface[] | undefined }) {
  const { showDatePicker, onCalendarBtnClick } = useHandleRosterContainer()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Components.PickedDate />
        <Components.CalendarBtn onClick={onCalendarBtnClick} />
        <Components.DatePicker showDatePicker={showDatePicker} />
      </div>
      <Components.Tables rosters={rosters} />
    </div>
  )
}

export default RosterContainer
