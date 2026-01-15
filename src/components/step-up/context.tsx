import { createContext, useReducer } from "react"

// Types
import * as AppTypes from '@/context/App/AppTypes'

type StepUpCtx = {
  dispatch: React.Dispatch<StepUpAction>
  filter: string
  searchValue: string
  shiftFilter: 'A' | 'B' | 'C' | ''
  showAllStaff: boolean
  skillsFilter: string
}

type StepUpState = Omit<StepUpCtx, 'dispatch'> 

type StepUpAction =
  | { type: 'SET_FILTER', payload: AppTypes.RankType | '' }
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'SET_SKILLS_FILTER', payload: string }
  | { type: 'TOGGLE_SHOW_ALL_STAFF', payload: boolean }
  | { type: 'SET_SHIFT_FILTER', payload: AppTypes.ShiftType | '' }

const initialState: StepUpState = {
  filter: '',
  searchValue: '',
  shiftFilter: '',
  showAllStaff: false,
  skillsFilter: ''
}

const StepUpCtx = createContext<StepUpCtx>({
  ...initialState,
  dispatch: () => null
})

const StepUpReducer = (state: StepUpState, action: StepUpAction) => {

  switch(action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'SET_SKILLS_FILTER':
      return {
        ...state,
        skillsFilter: action.payload
      }
    case 'TOGGLE_SHOW_ALL_STAFF':
      return {
        ...state,
        showAllStaff: action.payload
      }
    case 'SET_SHIFT_FILTER':
      return {
        ...state,
        shiftFilter: action.payload
      }
    default:
      return state
  }
}

export const StepUpProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(StepUpReducer, initialState)

  return (
    <StepUpCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </StepUpCtx.Provider>
  ) 
}

export default StepUpCtx