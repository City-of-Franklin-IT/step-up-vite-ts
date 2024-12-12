// Types
import { Schedule } from "../../../context/App/types"

export interface SchedulesTableProps { // SchedulesTable props
  data: Schedule[]
  employeeId: string
}

export interface TableRowProps { // TableRow props
  schedule: Schedule
}