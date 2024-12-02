// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { Staff, Action, Rank, Schedule } from "../../../context/App/types"

export interface TableContainerProps { // TableContainer props
  data: Staff[]
}

export interface TableContainerState { // TableContainer state obj
  searchValue: string
}

export interface UseSetTableDataProps { // useSetTableTable hook props
  data: Staff[],
  filter: string,
  skillsFilter: string,
  showAllStaff: boolean,
  searchValue: string
}

export interface UseSearchProps { // useSearch hook props
  searchValue: string,
  dispatch: Dispatch<Action>
}

export interface UseSetSkills { // useSetSkills hook props
  data: TableData[]
}

export interface FilterQualifiedProps { // filterQualified fn props
  data: Staff[],
  filter: string
}

export interface HandleResetSearchBtnProps { // handleResetSearchBtn fn props
  setState: Dispatch<SetStateAction<TableContainerState>>,
  dispatch: Dispatch<Action>
}

export interface ScrollToTopProps { // scrollToTop fn props
  topRef: RefObject<HTMLElement>
}

export interface TableData {
  employeeId: string,
  rank: Rank,
  fullName: string,
  skills: string,
  phone: string,
  email: string,
  hours: number,
  Schedules: Schedule[]
  [key: string]: string | Rank | number | Schedule[]
}