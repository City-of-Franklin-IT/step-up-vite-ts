import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useEnableQuery } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'
import RosterCtx from '@/components/roster/context'

export const useGetRoster = () => { // Get roster from Telestaff API
  const { rosterDate } = useContext(RosterCtx)

  const { enabled, token } = useEnableQuery()

  const today = new Date()
  const todayStr = `${ today.getFullYear() }-${ today.getMonth() + 1 }-${ today.getDate() }`

  const queryDate = rosterDate || todayStr

  return useQuery({ queryKey: ['getRosters', queryDate], queryFn: () => AppActions.getRoster(queryDate, authHeaders(token)), enabled: enabled && !!token && !!queryDate, staleTime: Infinity })
}