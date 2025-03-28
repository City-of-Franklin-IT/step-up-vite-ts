import { useState, useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import { useSelectDate } from "./hooks"
import { handleDateChange } from "./utils"
import styles from './RosterContainer.module.css'

// Types
import { RosterEntry } from "../../../context/App/types"
import { RosterContainerState } from "./types"

// Components
import * as Components from './components'

function RosterContainer({ rosters }: { rosters: RosterEntry[] }) {
  const { date } = useContext(AppContext)

  const [state, setState] = useState<RosterContainerState>({ showDatePicker: false, pickedDate: date || '' })

  useSelectDate(state.pickedDate) // Set selected date to ctx

  return (
    <div data-testid="roster-container" className={styles.container}>
      <div className={styles.header}>
        <Components.PickedDate pickedDate={state.pickedDate} />
        <Components.CalendarBtn onClick={() => setState(prevState => ({ ...prevState, showDatePicker: !prevState.showDatePicker }))} />
        <Components.DatePicker 
          showDatePicker={state.showDatePicker}
          handleChange={(e) => handleDateChange(e, setState)} />
      </div>
      <Components.Tables rosters={rosters} />
    </div>
  )
}

export default RosterContainer
