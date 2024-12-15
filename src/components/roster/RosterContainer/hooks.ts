import { useCallback, useContext, useEffect, useMemo } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { Station, Apparatus } from "../../../context/App/types"
import { UseSelectDateProps, UseRosterGroupsProps, RosterGroup, RosterItem, StationGroup, SetGroupsProps } from "./types"

export const useSelectDate = (date: UseSelectDateProps['date']): void => { // Set date to ctx
  const { dispatch } = useContext(AppContext)

  const cb = useCallback(() => {
    if(date) {
      dispatch({ type: 'SET_DATE', payload: date })
    }
  }, [date, dispatch])

  useEffect(() => {
    cb()
  }, [cb])
}

export const useRosterGroups = (data: UseRosterGroupsProps['data']): RosterGroup[] => { // Set roster groups by station
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

export const useSetGroups = (rosters: SetGroupsProps['rosters']): { station: string, units: StationGroup[] }[] => {
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