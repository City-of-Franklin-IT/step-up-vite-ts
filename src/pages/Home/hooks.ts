import { useQuery } from "react-query"
import { getStaff } from "../../context/App/AppActions"

// Types
import { UseGetStaffProps } from "./types"

export const useGetStaff = (user: UseGetStaffProps['user']) => { // Get staff
  return useQuery(['staff'], () => getStaff(), { enabled: !!user })
}