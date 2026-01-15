import { useContext, useMemo, useState } from "react"
import RosterCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/AppTypes'
import { RosterItemType } from "../../context"

/**
* Returns visibility boolean and calendar button onClick handler
**/
export const useHandleRosterContainer = () => {
  const [state, setState] = useState<{ showDatePicker: boolean }>({ showDatePicker: false })

  const onCalendarBtnClick = () => {
    setState(prevState => ({ showDatePicker: !prevState.showDatePicker }))
  }

  return { showDatePicker: state.showDatePicker, onCalendarBtnClick }
}

/**
* Returns date picker onChange handler; updates rosterDate in context
**/
export const useHandleDatePicker = () => {
  const { rosterDate, dispatch } = useContext(RosterCtx)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    if(payload !== rosterDate) {
      dispatch({ type: 'SET_ROSTER_DATE', payload })
    }
  }

  return onChange
}

type RosterGroupType = { key: string, roster: RosterItemType[] }

/**
* Returns array of roster groups
**/
export const useRosterGroups = (rosters: AppTypes.RosterEntryInterface[] | undefined): { station: string, units: StationGroupType[] }[] => {
  if(!rosters) return []

  const groups = useMemo(() => {
    const rosterMap = new Map<string, RosterItemType[]>()
  
    const stations: AppTypes.StationType[] = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]
  
    rosters.filter(roster => stations.includes(roster.stationAbrvCh)).forEach(roster => {
      const key = `${ roster.physicalUnitAbrvCh }-${ roster.stationAbrvCh }`
      const entry: RosterItemType = {
        employeeId: roster.rscEmployeeIDCh,
        name: roster.rscMasterNameCh,
        station: roster.stationAbrvCh.replace("S", ""),
        shift: roster.shiftAbrvCh,
        unit: roster.physicalUnitAbrvCh,
        rank: roster.rank,
        rankAbrv: roster.posJobAbrvCh,
        shiftStart: roster.shiftStartDt,
        shiftEnd: roster.shiftEndDt,
        staffStart: roster.staffingStartDt,
        staffEnd: roster.staffingEndDt,
        isParamedic: roster.isParamedic
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
  
    const entries: RosterGroupType[] = Array.from(rosterMap.entries()).map(([key, roster]): RosterGroupType => ({ key, roster }))
  
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
  }, [rosters])

  const stations = useSetStationGroups(groups)

  return stations
}

/**
* Returns selected date
**/
export const useHandlePickedDate = () => {
  const { rosterDate } = useContext(RosterCtx)

  const selectedDate = rosterDate ? 
    new Date(new Date(rosterDate).setDate(new Date(rosterDate).getDate() + 1)).toDateString() 
    : new Date().toDateString()

  return selectedDate
}

type StationGroupType = { unit: AppTypes.ApparatusType, roster: RosterItemType[] }

/**
* Returns array of objects containing station and units array
**/
const useSetStationGroups = (rosters: RosterGroupType[]): { station: string, units: StationGroupType[] }[] => {
  const stations = useMemo(() => {
    const stationsMap = new Map<string, StationGroupType[]>()
  
    rosters.forEach(obj => {
      const split = obj.key.split('-')
  
      const station = split[1].replace('S', '')
      const unit = split[0] as AppTypes.ApparatusType
  
      const entry: StationGroupType = {
        unit,
        roster: obj.roster
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

  return stations
}