// Types
import { Dispatch, ReactNode } from "react"

export interface AppContextObj { // AppContext
  dispatch: Dispatch<Action>,
  filter: string,
  searchValue: string
}

export interface AppState { // App context initial state object
  filter: string,
  searchValue: string
}

export interface AppReducerProps { // AppReducer props
  state: AppState,
  action: ReducerAction
}

export interface ReducerAction {
  type: string, payload: any
}

export interface AppProviderProps {
  children: ReactNode
}

export interface Staff {
  employeeId: string,
  rank: Rank,
  fullName: string,
  skills: string,
  detailCode: string,
  hours: number
  Schedules: Schedule[],
  [key: string]: any
}

export interface Schedule {
  employeeId: string,
  startDate: Date,
  startTime: string,
  endDate: Date,
  endTime: string,
  hours: number,
  detailCode: string
}

export interface RosterEntry {
  rscEmployeeIDCh: string,
  rscMasterNameCh: string,
  stationAbrvCh: Station,
  shiftAbrvCh: Shift,
  physicalUnitAbrvCh: Apparatus,
  posJobAbrvCh: RankAbrv,
  shiftStartDt: Date,
  shiftEndDt: Date,
  staffingStartDt: Date,
  staffingEndDt: Date,
  rank: RankWFD,
  isParamedic: boolean
}

export type Action =
  | { type: 'SET_FILTER', payload: string }
  | { type: 'SET_SEARCH_VALUE', payload: string }

export interface ServerResponse { // Server response object
  success: boolean
}

export interface GetStaffResponse extends ServerResponse { // getStaff API call response
  data: Staff[]
}

export interface GetRosterResponse extends ServerResponse { // getRoster API call response
  data: RosterEntry[]
}

type Rank =
  | "Firefighter"
  | "Engineer"
  | "Lieutenant"
  | "Captain"

export type Station =
  | "S1"
  | "S2"
  | "S3"
  | "S4"
  | "S5"
  | "S6"
  | "S7"
  | "S8"

export type Shift =
  | "A"
  | "B"
  | "C"

export type Apparatus =
  | "A7FK"
  | "B1FK"
  | "B7FK"
  | "BATT1FK"
  | "E10FK"
  | "E11FK"
  | "E1FK"
  | "E2FK"
  | "E6FK"
  | "E7FK"
  | "F10FK"
  | "F3FK"
  | "H6FK"
  | "L11FK"
  | "L3FK"
  | "L4FK"
  | "L5FK"
  | "L8FK"
  | "R2FK"
  | "R5FK"
  | "T10FK"
  | "T1FK"
  | "T2FK"
  | "T6FK"

export type RankAbrv =
  | "FF"
  | "ENG"
  | "OFF"
  | "BC"

export type RankWFD =
  | "FireCapt"
  | "FireLT"
  | "FireE"
  | "FireF"