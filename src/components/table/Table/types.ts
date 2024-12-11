// Types
import { TableData } from "../TableContainer/types"

export interface TableProps { // Table props
  data: TableData[]
}

export interface IsParamedicProps { // isParamedic fn props
  skills: string
}

export interface TableRowProps { // TableRow props
  employee: TableData
  index: number
}

export interface SetEmployeeProps { // SetEmployee props
  employee: TableData
  hovered?: boolean
}