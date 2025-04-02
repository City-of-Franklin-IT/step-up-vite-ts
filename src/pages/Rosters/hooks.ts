import { useContext } from 'react'
import { useQuery } from 'react-query'
import AppContext from '../../context/App/AppContext'
import { useGetToken, useEnableQuery } from '../../helpers/hooks'
import { authHeaders } from '../../helpers/utils'
import { getRoster } from '../../context/App/AppActions'

export const useGetRoster = () => { // Get roster from Telestaff API
  const { date } = useContext(AppContext)

  const token = useGetToken()

  const enabled = useEnableQuery(token)

  const today = new Date()
  const todayStr = `${ today.getFullYear() }-${ today.getMonth() + 1 }-${ today.getDate() }`

  const queryDate = date || todayStr

  return useQuery(['roster', queryDate], () => getRoster(queryDate, authHeaders(token)), { enabled })
}