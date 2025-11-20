import { useEffect, useContext, useState } from "react"
import StepUpCtx from "../../context"

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

  return { searchValue: state.searchValue, onChange }
}

export const useHandleClearBtn = () => {
  const { searchValue, dispatch } = useContext(StepUpCtx)

  const disabled = !searchValue

  const onClick = () => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
  }

  return { disabled, onClick }
}