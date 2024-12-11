import { useContext, useCallback, useEffect } from "react"
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