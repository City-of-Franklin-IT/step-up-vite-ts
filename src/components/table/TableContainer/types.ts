// Types
import { RefObject } from "react"
import { Staff, Rank, Schedule, Shift } from "../../../context/App/types"

export interface TableContainerProps { // TableContainer props
  data: Staff[]
}

export interface UseSetTableDataProps { // useSetTableTable hook props
  data: Staff[]
}

export interface UseSetSkills { // useSetSkills hook props
  data: TableData[]
}

export interface FilterQualifiedProps { // filterQualified fn props
  data: Staff[]
  filter: string
}

export interface ScrollToTopProps { // scrollToTop fn props
  topRef: RefObject<HTMLElement>
}

export interface TableData {
  employeeId: string
  rank: Rank
  fullName: string
  skills: string
  phone: string
  email: string
  hours: number
  shift: Shift | null
  Schedules: Schedule[]
  [key: string]: string | Rank | number | Schedule[] | null
}