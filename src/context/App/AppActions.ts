import { API_URL as baseUrl } from "../../config"

// Types
import { GetStaffResponse, GetRosterResponse } from './types'

// Get all staff
// GET /api/v1/ffd/step-up/staff
export const getStaff = async (): Promise<GetStaffResponse> => {
  const res = await fetch(`${ baseUrl }/staff`)

  return await res.json()
}

// Get roster
// GET /api/v1/ffd/step-up/roster?date=
export const getRoster = async (date: string): Promise<GetRosterResponse> => {
  const res = await fetch(`${ baseUrl }/rosters?date=${ date }`)

  return await res.json()
}