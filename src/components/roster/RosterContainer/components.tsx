import { useRosterGroups, useSetGroups } from './hooks'
import styles from './RosterContainer.module.css'

// Types
import { ChangeEvent } from 'react'
import { RosterEntry } from '../../../context/App/types'
import { RosterItem, StationGroup } from './types'

// Components
import CalendarIcon from '../../icons/CalendarIcon'
import RosterTable from '../RosterTable'
import RosterLegend from '../RosterLegend'
import LoadingIcon from '../../icons/LoadingIcon'

export const CalendarBtn = ({ handleClick }: { handleClick: () => void }) => {

  return (
    <button
      data-testid="calendar-btn" 
      type="button"
      className={styles.calendarBtn}
      onClick={handleClick}>
        <CalendarIcon width={28} height={28} />
    </button>
  )
}

export const DatePicker = ({ showDatePicker, handleChange }: { showDatePicker: boolean, handleChange: (e: ChangeEvent<HTMLInputElement>) => void }) => {

  return (
    <>
      {showDatePicker && (
        <input
          data-testid="date-picker" 
          type="date"
          className="input text-warning-content bg-warning"
          onChange={(e) => handleChange(e)} />
      )}
    </>
  )
}

export const Tables = ({ data }: { data: RosterEntry[] }) => {
  const groups = useRosterGroups(data)

  const stations = useSetGroups(groups)

  return (
    <div className={styles.tables}>
      <StationGroups stations={stations} />
    </div>
  )
}

const StationGroups = ({ stations }: { stations: { station: string, units: StationGroup[] }[] }) => {

  return (
    <>
      {stations.length ? stations.map(station => {
        return (
          <div data-testid="station-group" key={`station-${ station.station }`} className="flex flex-col">
            <div className={styles.stationHeader}>Station {station.station}</div>
            <div className={styles.stationGroup}>
              <Group groups={station.units} /> 
              <div className={styles.rosterLegend}><RosterLegend /></div>
            </div>
          </div>
        )
      }) : <LoadingIcon width={200} height={200} />}
    </>
  )
}

const Group = ({ groups }: { groups: StationGroup[] }) => {

  return (
    <>
      {groups.map(group => {
        return (
          <RosterTable
            key={`roster-table-${ group.unit }`}
            data={group.roster as RosterItem[]}
            label={group.unit} />
        )
      })}
    </>
  )
}