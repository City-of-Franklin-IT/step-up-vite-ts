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
