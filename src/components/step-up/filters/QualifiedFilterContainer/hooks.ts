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

/**
* Returns qualified filter button click handler and remove button visibility
**/
export const useHandleButtons = () => {
  const { filter, dispatch } = useContext(StepUpCtx)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.currentTarget as HTMLButtonElement).value as AppTypes.RankType | ''
    dispatch({ type: 'SET_FILTER', payload: value })
  }

  return { onClick, showRemoveBtn: !!filter }
}
