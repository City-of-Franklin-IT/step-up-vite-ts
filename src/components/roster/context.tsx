import { createContext, useReducer } from "react"

// Types
import * as AppTypes from '@/context/App/types'

export type RosterItemType = {
  employeeId: string
  name: string
  station: string
  shift: AppTypes.ShiftType
  unit: AppTypes.ApparatusType
  rank: AppTypes.RankWFDType
  rankAbrv: AppTypes.RankAbrvType
  shiftStart: string
  shiftEnd: string
  staffStart: string
  staffEnd: string
  isParamedic: boolean
}

type RosterCtx = {
  dispatch: React.Dispatch<RosterAction>
  rosterDate: string
}

type RosterState = Omit<RosterCtx, 'dispatch'>

type RosterAction =
  | { type: 'SET_ROSTER_DATE', payload: string }

const initialState: RosterState = {
  rosterDate: ''
}

const RosterCtx = createContext<RosterCtx>({
  ...initialState,
  dispatch: () => null
})

const RosterReducer = (state: RosterState, action: RosterAction) => {

  switch(action.type) {
    case 'SET_ROSTER_DATE':
      return {
        ...state,
        rosterDate: action.payload
      }
    default:
      return state
  }
}

export const RosterProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(RosterReducer, initialState)

  return (
    <RosterCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </RosterCtx.Provider>
  )
}

export default RosterCtx