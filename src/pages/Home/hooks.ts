import { useQuery } from "@tanstack/react-query"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"

/**
* Returns staff data from server
**/
export const useGetStaff = () => { // Get staff
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ['getStaff'],
    queryFn: () => withTokenRefresh(() => AppActions.getStaff(authHeaders(token)), refreshToken),
    enabled: enabled && !!token,
    staleTime: Infinity
  })
}