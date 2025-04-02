import { useQuery } from "react-query"
import { getStaff } from "../../context/App/AppActions"
import { useGetToken, useEnableQuery } from "../../helpers/hooks"
import { authHeaders } from "../../helpers/utils"

export const useGetStaff = () => { // Get staff
  const token = useGetToken()

  const enabled = useEnableQuery(token)

  return useQuery(['staff'], () => getStaff(authHeaders(token)), { enabled })
}