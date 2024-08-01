// Types
import { TableData } from "../TableContainer/types"

export interface TableProps { // Table props
  data: TableData[]
}

export interface IsParamedicProps { // isParamedic fn props
  skills: string
}

export interface TableState { // Table state object
  hovered: number | undefined
}