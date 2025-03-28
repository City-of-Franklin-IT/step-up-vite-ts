// Types
import { Rank, Schedule, Shift } from "../../../context/App/types"

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