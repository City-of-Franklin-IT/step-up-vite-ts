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
    default:
      return state
  }
}

export default appReducer 