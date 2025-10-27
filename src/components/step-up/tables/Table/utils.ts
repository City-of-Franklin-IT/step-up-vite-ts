// Types
import * as AppTypes from '@/context/App/types'

export interface TableDataType {
  employeeId: string
  rank: AppTypes.RankType
  fullName: string
  skills: string
  phone: string
  email: string
  hours: number
  shift: AppTypes.ShiftType | null
  Schedules: AppTypes.ScheduleInterface[]
}

export const handleHours = (hours: number): string => { // Handle hours worked
  if(hours > 72) {
    return "72+"
  } else return hours.toString()
}

export const setProgressBar = (hours: number): string => { // Set step up hrs progress bar color
  if(hours > 72) { // >72 hrs
    return 'progress-success'
  }

  if(hours === 72) { // Exactly 72 hours
    return 'progress-success opacity-30'
  }

  return 'progress-warning bg-warning/20'
}