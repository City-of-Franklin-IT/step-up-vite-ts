// Types
import * as AppTypes from '@/context/App/AppTypes'
import { TableData } from "./hooks"

export const scrollToTop = (topRef: React.RefObject<HTMLElement | null>) => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
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
        Schedules: employee.Schedules
      }

      qualified.push(item)
    }
  })

  return qualified
}