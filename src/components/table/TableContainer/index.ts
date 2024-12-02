import { useMemo, useCallback } from "react"

// Types
import { UseSetTableDataProps, UseSearchProps, UseSetSkills, FilterQualifiedProps, HandleResetSearchBtnProps, ScrollToTopProps, TableData } from './types'

export const useSetTableData = (data: UseSetTableDataProps['data'], filter: UseSetTableDataProps['filter'], skillsFilter: UseSetTableDataProps['skillsFilter'], showAllStaff: UseSetTableDataProps['showAllStaff'], searchValue: UseSetTableDataProps['searchValue']): TableData[] => { // Set table data
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
          Schedules: x.Schedules
        }
        
        return entry
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
  }, [data, filter, skillsFilter, showAllStaff, searchValue])

  return array
} 

export const useSearch = (searchValue: UseSearchProps['searchValue'], dispatch: UseSearchProps['dispatch']): () => void => { // Set search value to ctx
  const cb = useCallback(() => {
    const cleanTimeout = setTimeout(() => {
      if(searchValue) {
        dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
      }
    }, 1000)
  
    return () => clearTimeout(cleanTimeout)
  }, [searchValue, dispatch])

  return cb
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

export const handleResetSearchBtn = (setState: HandleResetSearchBtnProps['setState'], dispatch: HandleResetSearchBtnProps['dispatch']): void => {
  setState({ searchValue: '' })
  dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
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

    if(employeeId && hours > 72) {
      const employee: TableData = {
        employeeId: obj.employeeId,
        rank: obj.rank,
        fullName: obj.fullName,
        skills: obj.skills,
        phone: obj.phone,
        email: obj.email,
        hours,
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