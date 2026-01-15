import { API_URL as baseUrl } from "../../config"

// Types
import * as AppTypes from '@/context/App/AppTypes'

/**
* Get all staff
* 
* GET /api/v1/ffd/step-up/staff
**/
export const getStaff = async (headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.StaffInterface[] }> => {
  const res = await fetch(`${ baseUrl }/staff`, { headers })

  return await res.json()
}

/**
* Get roster from Telestaff API
* 
* GET /api/v1/ffd/step-up/roster?date=
**/
export const getRoster = async (date: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.RosterEntryInterface[] }> => {
  const res = await fetch(`${ baseUrl }/rosters?date=${ date }`, { headers })

  return await res.json()
}