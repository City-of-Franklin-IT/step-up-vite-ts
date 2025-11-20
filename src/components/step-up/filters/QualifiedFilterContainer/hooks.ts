import React, { useContext, useState } from "react"
import { useGetWindowSize } from "@/helpers/hooks"
import StepUpCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleQualifiedFilterContainer = () => {
  const isMobile = useGetWindowSize()

  const [state, setState] = useState<{ hidden : boolean }>({ hidden: isMobile })

  const onHideBtnClick = () => {
    setState(prevState => ({ hidden: !prevState.hidden }))
  }

  return { hidden: state.hidden, onClick: onHideBtnClick }
}

export const useHandleButtons = () => {
  const { filter, dispatch } = useContext(StepUpCtx)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const payload = e.currentTarget.value as AppTypes.RankType

    dispatch({ type: 'SET_FILTER', payload })
  }

  return { onClick, showRemoveBtn: !!filter }
}