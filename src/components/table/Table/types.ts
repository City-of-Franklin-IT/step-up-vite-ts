// Types
import { Dispatch, SetStateAction } from "react"
import { TableData } from "../TableContainer/types"

export interface TableProps { // Table props
  data: TableData[]
}

export interface HandleRowHoverProps { // Handle row hover props
  setState: Dispatch<SetStateAction<TableState>>
  windowSize: number
  index: number
}

export interface IsParamedicProps { // isParamedic fn props
  skills: string
}

export interface TableState { // Table state object
  hovered: number | undefined
}