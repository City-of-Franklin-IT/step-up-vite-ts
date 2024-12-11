// Types
import { Schedule } from "../../../context/App/types"

export interface SchedulesTableProps { // SchedulesTable props
  data: Schedule[]
}

export interface TableRowProps { // TableRow props
  schedule: Schedule
  index: number
}