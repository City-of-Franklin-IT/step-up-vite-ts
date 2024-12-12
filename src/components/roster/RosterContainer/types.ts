// Types
import { Dispatch, SetStateAction } from "react"
import { RosterEntry, Shift, Apparatus, RankAbrv, RankWFD, Action } from "../../../context/App/types"

export interface RosterContainerProps { // RosterContainer props
  data: RosterEntry[]
}

export interface RosterContainerState { // RosterContainer state object
  showDatePicker: boolean
  date: string
}

export interface UseRosterGroupsProps { // useRosterGroups hook props
  data: RosterEntry[]
}

export interface UseSelectDateProps { // useSelectDate hook props
  date: string,
  dispatch: Dispatch<Action>
}

export interface SetGroupsProps { // setGroups fn props
  rosters: RosterGroup[]
}

export interface HandleDateChangeProps { // handleDateChange fn props
  event: React.ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<RosterContainerState>>
}

export interface SetDateProps { // setDate fn props
  date: string
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