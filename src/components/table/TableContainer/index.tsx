import { useMemo, useContext, ReactElement } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseSetTableDataProps, UseSetSkills, FilterQualifiedProps, ScrollToTopProps, TableData } from './types'

export const useSetTableData = (data: UseSetTableDataProps['data']): TableData[] => { // Set table data
  const { filter, skillsFilter, showAllStaff, searchValue, shiftFilter } = useContext(AppContext)

  const array = useMemo(() => {
    let array: TableData[] = []
  
    if(filter) { // Handle qualified filter
      array = filterQualified(data, filter)
    } else {
      array = data.map(x => {
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
  }, [data, filter, skillsFilter, showAllStaff, searchValue, shiftFilter])

  return array
} 

export const useSetSkills = (data: UseSetSkills['data']): string[] => { // Set employee skills
  const array = useMemo(() => {
    const skills: string[] = []
  
    data.forEach(obj => {
      obj.skills.split(',').forEach(x => {
        if(!skills.includes(x.trim())) {
          skills.push(x.trim())
        }
      })
    })
  
    return skills.filter(obj => obj !== '')
  }, [data])

  return array
}

export const Checkbox = (): ReactElement => { // Show all staff checkbox
  const { showAllStaff, dispatch } = useContext(AppContext)

  return (
    <div className="flex gap-2 ml-auto items-center w-fit">
      <label className="text-white uppercase text-sm">Include Staff With 0 Hours</label>
      <input type="checkbox" className="toggle toggle-success" checked={showAllStaff} onChange={() => dispatch({ type: 'TOGGLE_SHOW_ALL_STAFF', payload: !showAllStaff })}></input>
    </div>
  )
}

const filterQualified = (data: FilterQualifiedProps['data'], filter: FilterQualifiedProps['filter']): TableData[] => { // Filter staff by qualification
  const qualified: TableData[] = []

  data.forEach(obj => {
    let employeeId

    if(filter === 'Engineer' && obj.rank === 'Firefighter') { // Engineer filter
      employeeId = obj.employeeId
    }

    if(filter === 'Lieutenant' && (obj.rank === 'Firefighter' || obj.rank === 'Engineer')) { // Lieutenant filter
      employeeId = obj.employeeId
    }

    if(filter === 'Captain' && obj.rank === 'Lieutenant') { // Captain filter
      employeeId = obj.employeeId
    }

    if(filter === 'BC' && obj.rank === 'Captain') { // BC filter
      employeeId = obj.employeeId
    }

    let hours = 0

    obj.StepUps.forEach(x => {
      hours += x.hours
    })

    if(employeeId && hours >= 72) {
      const employee: TableData = {
        employeeId: obj.employeeId,
        rank: obj.rank,
        fullName: obj.fullName,
        skills: obj.skills,
        phone: obj.phone,
        email: obj.email,
        hours,
        shift: obj.shift,
        Schedules: obj.Schedules
      }

      qualified.push(employee)
    }
  })

  return qualified
}

export const scrollToTop = (topRef: ScrollToTopProps['topRef']): void => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}