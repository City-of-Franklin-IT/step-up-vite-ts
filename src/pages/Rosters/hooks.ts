import { useContext } from 'react'
import { useQuery } from 'react-query'
import AppContext from '../../context/App/AppContext'
import { getRoster } from '../../context/App/AppActions'
import { useValidateUser, useEnableQuery } from '../../helpers'

export const useGetRoster = () => { // Get roster from Telestaff API
  const { date } = useContext(AppContext)

  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  const today = new Date()
  const todayStr = `${ today.getFullYear() }-${ today.getMonth() + 1 }-${ today.getDate() }`

  const queryDate = date || todayStr

  return useQuery(['roster', queryDate], () => getRoster(queryDate), { enabled })
}