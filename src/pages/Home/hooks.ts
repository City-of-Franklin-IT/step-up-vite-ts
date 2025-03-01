import { useQuery } from "react-query"
import { getStaff } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

export const useGetStaff = () => { // Get staff
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['staff'], () => getStaff(), { enabled })
}