import { useCallback, useMemo, useEffect, ReactElement } from "react"
import styles from './RosterContainer.module.css'

// Types
import { ChangeEvent } from "react"
import { Apparatus, Station, RosterEntry } from "../../../context/App/types"
import { UseRosterGroupsProps, UseSelectDateProps, SetGroupsProps, HandleDateChangeProps, SetDateProps, RosterItem, RosterGroup, StationGroup } from "./types"

// Components
import CalendarIcon from "../../icons/CalendarIcon/CalendarIcon"
import RosterLegend from "../RosterLegend/RosterLegend"
import RosterTable from "../RosterTable/RosterTable"
import LoadingIcon from "../../icons/LoadingIcon/LoadingIcon" 

export const useSelectDate = (date: UseSelectDateProps['date'], dispatch: UseSelectDateProps['dispatch']): void => { // Set date to ctx
  const cb = useCallback(() => {
    if(date) {
      dispatch({ type: 'SET_DATE', payload: date })
    }
  }, [date, dispatch])

  useEffect(() => {
    cb()
  }, [cb])
} 

export const handleDateChange = (event: HandleDateChangeProps['event'], setState: HandleDateChangeProps['setState']): void => {
  const date = new Date(event.target.value)

  if(!isNaN(date.getTime()) && date.getFullYear().toString().length === 4) { // Valid date/time
    return setState(prevState => ({ ...prevState, showDatePicker: false, date: event.target.value }))
  }
}

export const setDate = (date: SetDateProps['date']): string => {
  return date ? new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toDateString() : new Date().toDateString()
}

export const CalendarBtn = ({ handleClick }: { handleClick: () => void }): ReactElement => {

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

export const DatePicker = ({ showDatePicker, handleChange }: { showDatePicker: boolean, handleChange: (e: ChangeEvent<HTMLInputElement>) => void }): ReactElement => {

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

export const Tables = ({ data }: { data: RosterEntry[] }): ReactElement => {
  const groups = useRosterGroups(data)

  const stationGroups = useSetGroups(groups)

  return (
    <div className={styles.tables}>
      {stationGroups.length ? stationGroups.map(obj => {
          return (
            <div data-testid="station-group" key={`station-${ obj.station }`} className="flex flex-col">
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
                <div className={styles.rosterLegend}><RosterLegend /></div>
              </div>
            </div>
          )
        }) : (
          <LoadingIcon width={200} height={200} />
        )
      }
    </div>
  )
}

const useRosterGroups = (data: UseRosterGroupsProps['data']): RosterGroup[] => { // Set roster groups by station
  const array = useMemo(() => {
    const rosterMap = new Map<string, RosterItem[]>()
  
    const stations: Station[] = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]
  
    data.filter(obj => stations.includes(obj.stationAbrvCh)).forEach(obj => {
      const key = `${ obj.physicalUnitAbrvCh }-${ obj.stationAbrvCh }`
      const entry: RosterItem = {
        employeeId: obj.rscEmployeeIDCh,
        name: obj.rscMasterNameCh,
        station: obj.stationAbrvCh.replace("S", ""),
        shift: obj.shiftAbrvCh,
        unit: obj.physicalUnitAbrvCh,
        rank: obj.rank,
        rankAbrv: obj.posJobAbrvCh,
        shiftStart: obj.shiftStartDt,
        shiftEnd: obj.shiftEndDt,
        staffStart: obj.staffingStartDt,
        staffEnd: obj.staffingEndDt,
        isParamedic: obj.isParamedic
      }
  
      if(rosterMap.has(key)) { // Append to existing
        const existing = rosterMap.get(key)!
        rosterMap.set(key, [
          ...existing,
          entry
        ])
      } else { // New 
        rosterMap.set(key, [entry])
      }
    })
  
    const entries: RosterGroup[] = Array.from(rosterMap.entries()).map(([key, value]): RosterGroup => ({ key, value }))
  
    const sorted = entries.sort((a, b) => {
      const stationA = parseInt(a.key.split('-')[1].replace('S', ''))
      const stationB = parseInt(b.key.split('-')[1].replace('S', ''))
  
      if(stationA > stationB) {
        return 1
      }
  
      if(stationA < stationB) {
        return -1
      }
  
      return 0
    })
  
    return sorted
  }, [data])

  return array
}

const useSetGroups = (rosters: SetGroupsProps['rosters']): { station: string, units: StationGroup[] }[] => {
  const obj = useMemo(() => {
    const stationsMap = new Map<string, StationGroup[]>()
  
    rosters.forEach(obj => {
      const split = obj.key.split('-')
  
      const station = split[1].replace('S', '')
      const unit = split[0] as Apparatus
  
      const entry: StationGroup = {
        unit,
        roster: obj.value
      }
  
      if(stationsMap.has(station)) {
        const existing = stationsMap.get(station)?.map(obj => obj).flat() || []
        const updatedUnits = [ ...existing, entry ]
  
        stationsMap.set(station, [ ...updatedUnits ])
      } else {
        stationsMap.set(station, [entry])
      }
    })
  
    const groups = Array.from(stationsMap.entries()).map(([station, units]) => ({ station, units }))
  
    return groups
  }, [rosters])

  return obj
}