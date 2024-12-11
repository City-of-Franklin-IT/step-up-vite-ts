// Types
import { Dispatch, ReactNode } from "react"

export interface AppContextObj { // AppContext
  dispatch: Dispatch<Action>,
  date: string
  filter: string
  searchValue: string
  shiftFilter: Shift | null
  showAllStaff: boolean
  skillsFilter: string
}

export interface AppState { // App context initial state object
  date: string
  filter: string
  searchValue: string
  shiftFilter: Shift | null
  showAllStaff: boolean
  skillsFilter: string
}

export interface AppReducerProps { // AppReducer props
  state: AppState,
  action: Action
}

export interface AppProviderProps {
  children: ReactNode
}

export interface Staff {
  employeeId: string
  rank: Rank
  fullName: string
  skills: string
  phone: string
  email: string
  shift: Shift | null
  StepUps: StepUps[]
  Schedules: Schedule[]
  [key: string]: string | Rank | StepUps[] | Schedule[] | Shift | null
}

export interface Schedule {
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
  | { type: 'SET_SKILLS_FILTER', payload: string }
  | { type: 'SET_DATE', payload: string }
  | { type: 'TOGGLE_SHOW_ALL_STAFF', payload: boolean }
  | { type: 'SET_SHIFT_FILTER', payload: Shift | null }

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

export interface GetStaffResponse extends ServerResponse { // getStaff API call response
  data: Staff[]
}

export interface GetRosterResponse extends ServerResponse { // getRoster API call response
  data: RosterEntry[]
}

export type Rank =
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

export type DetailCode =
  | "ENG"
  | "LT"
  | "CAP"
  | "BC"

interface StepUps {
  detailCode: DetailCode,
  hours: number
}