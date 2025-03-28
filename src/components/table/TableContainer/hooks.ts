import { useMemo, useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { Staff } from "../../../context/App/types"
import { TableData } from './types'

export const useSetTableData = (staff: Staff[]): TableData[] => { // Set table data
  const { filter, skillsFilter, showAllStaff, searchValue, shiftFilter } = useContext(AppContext)

  const array = useMemo(() => {
    let array: TableData[] = []
  
    if(filter) { // Handle qualified filter
      array = filterQualified(staff, filter)
    } else {
      array = staff.map(x => {
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
      array = array.filter(obj => {
        return obj.shift === shiftFilter
      })
    }
  
    if(skillsFilter) { // Handle skills filter
      array = array.filter(obj => {
        const skills = obj.skills.split(',').map(skill => skill.trim())
  
        return skills.includes(skillsFilter)
      })
    }

  
    if(searchValue) { // Handle search 
      const regex = new RegExp(searchValue, 'i')
  
      array = array.filter(obj => {
        for(const prop in obj) {
          if(typeof obj[prop] === 'string' && regex.test(obj[prop])) {
            return true
          }
        }
      })
    }
  
    if(!showAllStaff) {
      return array.filter(obj => obj.hours > 0)
    }
  
    return array
  }, [staff, filter, skillsFilter, showAllStaff, searchValue, shiftFilter])

  return array
} 

export const useSetSkills = (staff: TableData[]): string[] => { // Set employee skills
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

const filterQualified = (staff: Staff[], filter: string): TableData[] => { // Filter staff by qualification
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