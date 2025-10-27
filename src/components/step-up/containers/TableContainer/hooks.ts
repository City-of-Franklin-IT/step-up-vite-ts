import React, { useMemo, useContext, useRef } from "react"
import StepUpCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export interface TableData {
  employeeId: string
  rank: AppTypes.RankType
  fullName: string
  skills: string
  phone: string
  email: string
  hours: number
  shift: AppTypes.ShiftType | null
  Schedules: AppTypes.ScheduleInterface[]
  [key: string]: string | AppTypes.RankType | number | AppTypes.ScheduleInterface[] | null
}

export const useHandleTableContainer = (staff: AppTypes.StaffInterface[] | undefined): { tableData: TableData[], skills: string[], topRef: React.RefObject<HTMLDivElement|null> } => { // Set table data
  const { filter, skillsFilter, showAllStaff, searchValue, shiftFilter } = useContext(StepUpCtx)

  const topRef = useRef<HTMLDivElement>(null)

  if(!staff) return { tableData: [], skills: [], topRef }

  const tableData = useMemo(() => {
    let data: TableData[] = []

    if(filter) { // Handle qualified filter
      data = filterQualified(staff, filter)
    } else {
      data = staff.map(x => {
        let hours = 0

        x.StepUps.forEach(y => hours += y.hours) // Sum hours

        const entry: TableData = {
          employeeId: x.employeeId,
          rank: x.rank,
          fullName: x.fullName,
          skills: x.skills,
          phone: x.phone,
          email: x.email,
          hours,
          shift: x.shift,
          Schedules: x.Schedules
        }

        return entry
      })
    }

    if(shiftFilter) { // Handle shift filter
      data = data.filter(obj => {
        return obj.shift === shiftFilter
      })
    }

    if(skillsFilter) { // Handle skills filter
      data = data.filter(obj => {
        const skills = obj.skills.split(',').map(skill => skill.trim())

        return skills.includes(skillsFilter)
      })
    }

    if(searchValue) { // Handle search
      const regex = new RegExp(searchValue, 'i')

      data = data.filter(obj => {
        for(const prop in obj) {
          if(typeof obj[prop] === 'string' && regex.test(obj[prop])) {
            return true
          }
        }
        return false
      })
    }

    if(!showAllStaff) {
      return data.filter(obj => obj.hours > 0)
    }

    return data
  }, [staff, filter, skillsFilter, showAllStaff, searchValue, shiftFilter])

  const skills = useSetSkills(tableData)

  return { tableData, skills, topRef }
} 

const useSetSkills = (staff: TableData[]): string[] => { // Set employee skills
  const array = useMemo(() => {
    const skills: string[] = []
  
    staff.forEach(employee => {
      employee.skills.split(',').forEach(x => {
        if(!skills.includes(x.trim())) {
          skills.push(x.trim())
        }
      })
    })
  
    return skills.filter(obj => obj !== '')
  }, [staff])

  return array
}

const filterQualified = (staff: AppTypes.StaffInterface[], filter: string): TableData[] => { // Filter staff by qualification
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