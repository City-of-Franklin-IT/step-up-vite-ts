// Types
import * as AppTypes from '@/context/App/AppTypes'
import { TableData } from "./hooks"

export const scrollToTop = (topRef: React.RefObject<HTMLElement | null>) => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}

export const getQualifyingShifts = (schedules: AppTypes.ScheduleInterface[]): AppTypes.ScheduleInterface[] => { // Get shifts required to reach 72+ hours
  if(!schedules.length) return []

  const sorted = [...schedules].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

  const qualifying: AppTypes.ScheduleInterface[] = []
  let cumulativeHours = 0

  for(const shift of sorted) {
    qualifying.push(shift)
    cumulativeHours += shift.hours

    if(cumulativeHours >= 72) break // Inclusive threshold
  }

  return qualifying
}

export const filterQualified = (staff: AppTypes.StaffInterface[], filter: string): TableData[] => { // Filter staff by qualification
  const qualified: TableData[] = []

  staff.forEach(employee => {
    let employeeId

    if(filter === 'Engineer' && employee.rank === 'Firefighter') { // Engineer filter
      employeeId = employee.employeeId
    }

    if(filter === 'Lieutenant' && (employee.rank === 'Firefighter' || employee.rank === 'Engineer')) { // Lieutenant filter
      employeeId = employee.employeeId
    }

    if(filter === 'Captain' && employee.rank === 'Lieutenant') { // Captain filter
      employeeId = employee.employeeId
    }

    if(filter === 'BC' && employee.rank === 'Captain') { // BC filter
      employeeId = employee.employeeId
    }

    let hours = 0

    employee.StepUps.forEach(x => {
      hours += x.hours
    })

    if(employeeId && hours >= 72) {
      const item: TableData = {
        employeeId: employee.employeeId,
        rank: employee.rank,
        fullName: employee.fullName,
        skills: employee.skills,
        phone: employee.phone,
        email: employee.email,
        hours,
        shift: employee.shift,
        Schedules: employee.Schedules,
        QualifyingSchedules: getQualifyingShifts(employee.QualifyingSchedules)
      }

      qualified.push(item)
    }
  })

  return qualified
}