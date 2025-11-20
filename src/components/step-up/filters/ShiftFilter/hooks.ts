import React, { useContext, useState } from "react"
import { useGetWindowSize } from "@/helpers/hooks"
import StepUpCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleShiftFilterContainer = () => {
  const isMobile = useGetWindowSize()

  const [state, setState] = useState<{ hidden : boolean }>({ hidden: isMobile })

  const onHideBtnClick = () => {
    setState(prevState => ({ hidden: !prevState.hidden }))
  }

  return { hidden: state.hidden, onClick: onHideBtnClick }
}

export const useHandleShiftBtns = () => {
  const { shiftFilter, dispatch } = useContext(StepUpCtx)

  const isMobile = useGetWindowSize()

  const visible = !shiftFilter && !isMobile

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_SHIFT_FILTER', payload: e.currentTarget.value as AppTypes.ShiftType })
  }

  return { visible, onClick }
}

export const useHandleRemoveFilterBtn = () => {
  const { shiftFilter, dispatch } = useContext(StepUpCtx)

  const onClick = () => {
    dispatch({ type: 'SET_SHIFT_FILTER', payload: '' })
  }

  const visible = !!shiftFilter

  return { visible, onClick }
}