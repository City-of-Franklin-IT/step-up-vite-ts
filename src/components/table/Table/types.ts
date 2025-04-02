// Types
import { TableData } from "../TableContainer/types"

export interface TableRowProps { // TableRow props
  employee: TableData
  index: number
}

export interface SetEmployeeProps { // SetEmployee props
  employee: TableData
  hovered?: boolean
}