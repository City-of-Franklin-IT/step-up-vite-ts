import { useContext } from "react"
import StepUpCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/AppTypes'

/**
* Returns qualified filter select value and change handler
**/
export const useHandleQualifiedFilter = () => {
  const { filter, dispatch } = useContext(StepUpCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_FILTER', payload: e.target.value as AppTypes.RankType | '' })
  }

  return { value: filter, onChange }
}
