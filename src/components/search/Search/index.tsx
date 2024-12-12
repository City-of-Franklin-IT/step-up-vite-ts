import { useContext, useCallback, useEffect, ReactElement, ChangeEvent } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseSearchProps } from "./types"

export const useSearch = (searchValue: UseSearchProps['searchValue']): void => { // Set search value to ctx
  const { dispatch } = useContext(AppContext)

  const cb = useCallback(() => {
    const cleanTimeout = setTimeout(() => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
    }, 1000)
  
    return () => clearTimeout(cleanTimeout)
  }, [searchValue, dispatch])

  useEffect(() => {
    cb()
  }, [cb])
}

export const SearchInput = ({ searchValue, handleChange }: { searchValue: string, handleChange: (e: ChangeEvent<HTMLInputElement>) => void }): ReactElement => {
  return (
    <input 
      data-testid="search-input"
      type="text" 
      value={searchValue} 
      placeholder="by employee name.." 
      onChange={(e) => handleChange(e)} 
      className="input bg-white rounded-r-none w-full" />
  )
}

export const ClearBtn = ({ resetState }: { resetState: () => void }): ReactElement => {
  const { searchValue: searchValue_ctx } = useContext(AppContext)

  return (
    <button 
      type="button" 
      onClick={resetState}
      disabled={!searchValue_ctx && true}
      className="btn btn-primary uppercase rounded-l-none">
      Clear
    </button>
  )
}