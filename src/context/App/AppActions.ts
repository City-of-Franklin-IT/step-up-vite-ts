import { API_URL as baseUrl } from "../../config"

// Types
import { GetStaffResponse, GetRosterResponse } from './types'

// Get all staff
// GET /api/v1/ffd/step-up/staff
export const getStaff = async (headers: Headers): Promise<GetStaffResponse> => {
  const res = await fetch(`${ baseUrl }/staff`, { headers })

  return await res.json()
}

// Get roster
// GET /api/v1/ffd/step-up/roster?date=
export const getRoster = async (date: string, headers: Headers): Promise<GetRosterResponse> => {
  const res = await fetch(`${ baseUrl }/rosters?date=${ date }`, { headers })

  return await res.json()
}