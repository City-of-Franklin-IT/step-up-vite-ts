import styles from './RosterContainer.module.css'
import { useRosterGroups, useHandleDatePicker, useHandlePickedDate } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'
import { RosterItemType } from '../../context'

// Components
import CalendarIcon from '../../../icons/CalendarIcon'
import RosterTable from '../../tables/RosterTable'
import RosterLegend from '../../tables/RosterLegend'
import Loading from '@/components/loading/Loading'

export const CalendarBtn = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => {

  return (
    <button
      type="button"
      className={styles.calendarBtn}
      onClick={onClick}>
        <CalendarIcon width={28} height={28} />
    </button>
  )
}

export const DatePicker = ({ showDatePicker }: { showDatePicker: boolean }) => {
  const onChange = useHandleDatePicker()

  if(!showDatePicker) return null

  return (
    <input
      type="date"
      className="input text-warning-content bg-warning"
      onChange={(e) => onChange(e)} />
  )
}

export const PickedDate = () => {
  const selectedDate = useHandlePickedDate()

  return (
    <span>{selectedDate}</span>
  )
}

export const Tables = ({ rosters }: { rosters: AppTypes.RosterEntryInterface[] | undefined }) => {
  const stations = useRosterGroups(rosters)

  return (
    <div className={styles.tables}>
      <StationGroups stations={stations} />
    </div>
  )
}

type StationGroupType = { unit: AppTypes.ApparatusType, roster: RosterItemType[] }

const StationGroups = ({ stations }: { stations: { station: string, units: StationGroupType[] }[] }) => {
  if(!stations.length) return <Loading />

  return (
    <>
      {stations.map(station => {
        return (
          <div key={`station-group-${ station.station }`} className="flex flex-col gap-3">
            <div className={styles.stationHeader}>Station {station.station}</div>
            <div className={styles.stationGroup}>
              <Group groups={station.units} /> 
            </div>
            <RosterLegend />
          </div>
        )
      })}
    </>
  )
}

const Group = ({ groups }: { groups: StationGroupType[] }) => {

  return (
    <>
      {groups.map(group => {
        return (
          <RosterTable
            key={`roster-table-${ group.unit }`}
            rosters={group.roster as RosterItemType[]}
            label={group.unit} />
        )
      })}
    </>
  )
}