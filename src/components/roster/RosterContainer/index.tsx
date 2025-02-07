import { useState, useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import { useSelectDate } from "./hooks"
import { handleDateChange, setDate } from "./utils"
import styles from './RosterContainer.module.css'

// Types
import { RosterContainerProps, RosterContainerState } from "./types"

// Components
import { CalendarBtn, DatePicker, Tables } from "./components"

function RosterContainer({ data }: RosterContainerProps) {
  const { date } = useContext(AppContext)

  const [state, setState] = useState<RosterContainerState>({ showDatePicker: false, date: date || '' })

  useSelectDate(state.date) // Set selected date to ctx

  return (
    <div data-testid="roster-container" className={styles.container}>
      <div className={styles.header}>
        {setDate(state.date)}
        <CalendarBtn handleClick={() => setState(prevState => ({ ...prevState, showDatePicker: !prevState.showDatePicker }))} />
        <DatePicker 
          showDatePicker={state.showDatePicker}
          handleChange={(e) => handleDateChange(e, setState)} />
      </div>
      <Tables data={data} />
    </div>
  )
}

export default RosterContainer
