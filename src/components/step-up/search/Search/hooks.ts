import { useEffect, useContext, useState } from "react"
import StepUpCtx from "../../context"

/**
* Returns searchValue from context and search component onChange handler; updates searchValue in context
**/
export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(StepUpCtx)
  const [state, setState] = useState<{ searchValue: string }>({ searchValue: '' })

  const onChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setState({ searchValue: value })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: state.searchValue })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [state.searchValue, dispatch])

  useEffect(() => {
    setState({ searchValue })
  }, [searchValue])

  return { value: state.searchValue, onChange }
}

/**
* Returns clear search button props including onClick handler
**/
export const useHandleClearBtn = () => {
  const { searchValue, dispatch } = useContext(StepUpCtx)

  const disabled = !searchValue

  const onClick = () => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
  }

  return { disabled, onClick }
}