import { Reducer, createContext, useReducer } from 'react'
import appReducer from './AppReducer'

// Types
import { ReactNode } from 'react'
import { AppContextObj, AppState, Action } from './types'

const AppContext = createContext<AppContextObj>({
  dispatch: () => {},
  date: '',
  filter: '',
  searchValue: '',
  skillsFilter: ''
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    date: '',
    filter: '',
    searchValue: '',
    skillsFilter: ''
  }

  const [state, dispatch] = useReducer<Reducer<AppState, Action>>(appReducer, initialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext