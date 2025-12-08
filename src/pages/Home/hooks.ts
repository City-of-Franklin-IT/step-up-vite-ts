import { useQuery } from "@tanstack/react-query"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"

export const useGetStaff = () => { // Get staff
  const { enabled, token } = useEnableQuery()

  return useQuery({ queryKey: ['getStaff'], queryFn: () => AppActions.getStaff(authHeaders(token)), enabled: enabled && !!token, staleTime: Infinity })
}