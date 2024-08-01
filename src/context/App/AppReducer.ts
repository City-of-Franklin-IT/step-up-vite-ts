// Types
import { AppReducerProps } from './types'

const appReducer = (state: AppReducerProps['state'], action: AppReducerProps['action']) => {
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
    case 'SET_DATE':
      return {
        ...state,
        date: action.payload
      }
    case 'TOGGLE_SHOW_ALL_STAFF':
      return {
        ...state,
        showAllStaff: action.payload
      }
    default:
      return state
  }
}

export default appReducer 