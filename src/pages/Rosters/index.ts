import { useQuery } from 'react-query'
import { getRoster } from '../../context/App/AppActions'

// Types
import { UseGetRosterProps } from './types'

export const useGetRoster = (date: UseGetRosterProps['date']) => { // Get roster from Telestaff API
  const today = new Date()
  const todayStr = `${ today.getFullYear() }-${ today.getMonth() + 1 }-${ today.getDate() }`

  const queryDate = date || todayStr

  return useQuery(['roster', queryDate], () => getRoster(queryDate))
}