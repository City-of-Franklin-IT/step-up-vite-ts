import { useContext } from "react"
import StepUpCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/AppTypes'

/**
* Returns shift filter select value and change handler
**/
export const useHandleShiftFilter = () => {
  const { shiftFilter, dispatch } = useContext(StepUpCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_SHIFT_FILTER', payload: e.target.value as AppTypes.ShiftType | '' })
  }

  return { value: shiftFilter, onChange }
}

/**
* Returns shift filter button click handler and visibility
**/
export const useHandleShiftBtns = () => {
  const { shiftFilter, dispatch } = useContext(StepUpCtx)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.currentTarget as HTMLButtonElement).value as AppTypes.ShiftType | ''
    dispatch({ type: 'SET_SHIFT_FILTER', payload: value })
  }

  return { onClick, visible: !shiftFilter }
}

/**
* Returns remove filter button handler and visibility
**/
export const useHandleRemoveFilterBtn = () => {
  const { shiftFilter, dispatch } = useContext(StepUpCtx)

  const onClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_SHIFT_FILTER', payload: '' })
  }

  return { onClick, visible: !!shiftFilter }
}
