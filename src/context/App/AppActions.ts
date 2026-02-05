import { NODE_ENV } from "../../config"

const baseUrl = NODE_ENV === 'development' ?
    'https://cofasv38.franklin-gov.com/api/v2/ffd/step-up' :
    'https://fireapps.franklintn.gov/api/v2/ffd/step-up'

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

/**
* Get documentation
*
* GET /api/v2/ffd/step-up/docs
**/
export const getDocs = async (headers: Headers) => {
  const res = await fetch(`${ baseUrl }/docs`, { headers })

  return await res.json()
}
