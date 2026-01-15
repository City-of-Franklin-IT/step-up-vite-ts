import React, { useContext, useState } from "react"
import StepUpCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/AppTypes'

/**
* Returns shift filter button props and buttons visibility boolean
**/
export const useHandleShiftFilterContainer = () => {
  const [state, setState] = useState<{ hidden : boolean }>({ hidden: false })

  const onHideBtnClick = () => {
    setState(prevState => ({ hidden: !prevState.hidden }))
  }

  return { hidden: state.hidden, onClick: onHideBtnClick }
}

/**
* Returns shift filter button props and visibility boolean
**/
export const useHandleShiftBtns = () => {
  const { shiftFilter, dispatch } = useContext(StepUpCtx)

  const visible = !shiftFilter

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_SHIFT_FILTER', payload: e.currentTarget.value as AppTypes.ShiftType })
  }

  return { visible, onClick }
}

/**
* Returns remove filter button visibility boolean and onClick handler
**/
export const useHandleRemoveFilterBtn = () => {
  const { shiftFilter, dispatch } = useContext(StepUpCtx)

  const onClick = () => {
    dispatch({ type: 'SET_SHIFT_FILTER', payload: '' })
  }

  const visible = !!shiftFilter

  return { visible, onClick }
}