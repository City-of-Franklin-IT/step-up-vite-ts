import { useState } from "react"
import { useRosterGroups, setGroups } from "."
import styles from './RosterContainer.module.css'

// Types
import { RosterContainerProps, RosterContainerState, RosterItem } from "./types"

// Components
import RosterTable from "../RosterTable/RosterTable"
import HideBtn from "../../buttons/HideBtn/HideBtn"
import LoadingIcon from "../../icons/LoadingIcon/LoadingIcon"

function RosterContainer({ data }: RosterContainerProps) {
  const [state, setState] = useState<RosterContainerState>({ hidden: false })

  const groups = useRosterGroups(data)

  const date = new Date()

  const stationGroups = setGroups(groups)

  return (
    <div className={styles.container}>
      <div className={styles.header}>{date.toDateString()}</div>
      <div>
        <HideBtn
          setState={setState}
          label={!state.hidden ? 'Hide Rosters' : 'Show Rosters'} />
      </div>
      <div className={state.hidden ? 'hidden' : styles.tables}>
        {stationGroups.length ? stationGroups.map(obj => {
          return (
            <div className="flex flex-col">
              <div className={styles.stationHeader}>Station {obj.station}</div>
              <div className={styles.stationGroup}>
                {obj.units.map(unit => {
                  return (
                    <RosterTable
                      key={unit.unit}
                      data={unit.roster as RosterItem[]}
                      label={unit.unit} />
                  )
                })} 
              </div>
            </div>
          )
        }) : (
            <LoadingIcon width={200} height={200} />
        )}
      </div>
    </div>
  )
}

export default RosterContainer
