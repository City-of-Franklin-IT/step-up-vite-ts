// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { Staff, Action } from "../../../context/App/types"

export interface TableContainerProps { // TableContainer props
  data: Staff[]
}

export interface TableContainerState { // TableContainer state obj
  searchValue: string
}

export interface UseSetTableDataProps { // useSetTableTable hook props
  data: Staff[],
  filter: string,
  searchValue: string
}

export interface UseSearchProps { // useSearch hook props
  searchValue: string,
  dispatch: Dispatch<Action>
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