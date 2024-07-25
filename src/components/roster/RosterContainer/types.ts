// Types
import { RosterEntry, Shift, Apparatus, RankAbrv, RankWFD } from "../../../context/App/types"

export interface RosterContainerProps { // RosterContainer props
  data: RosterEntry[]
}

export interface RosterContainerState { // RosterContainer state object
  hidden: boolean
}

export interface UseRosterGroupsProps { // useRosterGroups hook props
  data: RosterEntry[]
}

export interface SetGroupsProps { // setGroups fn props
  rosters: RosterGroup[]
}

export interface RosterItem {
  employeeId: string,
  name: string,
  station: string,
  shift: Shift,
  unit: Apparatus,
  rank: RankWFD,
  rankAbrv: RankAbrv,
  shiftStart: Date,
  shiftEnd: Date,
  staffStart: Date,
  staffEnd: Date,
  isParamedic: boolean
}

export interface RosterGroup {
  key: string,
  value: RosterItem[]
}

export interface StationGroup {
  unit: Apparatus,
  roster: RosterItem[]
}

interface UnitGroup {
  unit: Apparatus,
  roster: RosterItem[]
}