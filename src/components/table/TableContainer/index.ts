import { useMemo, useCallback } from "react"

// Types
import { Staff } from '../../../context/App/types'
import { UseSetTableDataProps, UseSearchProps, FilterQualifiedProps, HandleResetSearchBtnProps, ScrollToTopProps } from './types'

export const useSetTableData = (data: UseSetTableDataProps['data'], filter: UseSetTableDataProps['filter'], searchValue: UseSetTableDataProps['searchValue']): Staff[] => useMemo(() => { // Set table data
  let array: Staff[] = []

    if(filter) { // Filter applied
      array = filterQualified(data, filter)
      if(searchValue) {
        const regex = new RegExp(searchValue, 'i')

        array = array.filter(obj => {
          for(const prop in obj) {
            if(typeof obj[prop] === 'string' && regex.test(obj[prop])) {
              return true
            }
          }
        })
      }
    } else { // No filter applied
      if(searchValue) {
        const regex = new RegExp(searchValue, 'i')

        array = data.filter(obj => {
          for(const prop in obj) {
            if(typeof obj[prop] === 'string' && regex.test(obj[prop])) {
              return true
            }
          }
        })
      } else array = data
    }

    const aggregatedHours = (data: Staff[]): Staff[] => { // Aggregate duplicate employeeIds (Firefighters stepping up to either Engineer or Lieutenant)
      const aggregatedDataMap = new Map<string, Staff>()

      data.forEach(obj => {
        if(aggregatedDataMap.has(obj.employeeId)) {
          const existing = aggregatedDataMap.get(obj.employeeId)!
          aggregatedDataMap.set(obj.employeeId, {
            ...existing,
            hours: existing.hours + obj.hours
          })
        } else {
          aggregatedDataMap.set(obj.employeeId, obj)
        }
      })

      return Array.from(aggregatedDataMap.values())
    }

    const aggregated = aggregatedHours(array)

    return aggregated
}, [data, filter, searchValue])

export const useSearch = (searchValue: UseSearchProps['searchValue'], dispatch: UseSearchProps['dispatch']): () => void => useCallback(() => { // Set search value to ctx
  const cleanTimeout = setTimeout(() => {
    if(searchValue) {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
    }
  }, 1000)

  return () => clearTimeout(cleanTimeout)
}, [searchValue])

export const handleResetSearchBtn = (setState: HandleResetSearchBtnProps['setState'], dispatch: HandleResetSearchBtnProps['dispatch']): void => {
  setState({ searchValue: '' })
  dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
}

const filterQualified = (data: FilterQualifiedProps['data'], filter: FilterQualifiedProps['filter']): Staff[] => { // Filter staff by qualification
  const qualified: Staff[] = []

  data.forEach(obj => {
    let employeeId
    let filtered: Staff[] = []
    let summed = 0

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

    if(employeeId) { 
      filtered = data.filter(item => item.employeeId === obj.employeeId)

      filtered.forEach(x => summed += x.hours)

      if(summed >= 72) {
        qualified.push(obj)
      }
    }
  })

  return qualified
}

export const scrollToTop = (topRef: ScrollToTopProps['topRef']): void => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}