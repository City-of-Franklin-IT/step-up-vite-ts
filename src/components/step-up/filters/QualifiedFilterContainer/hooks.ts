import { useContext, useState } from "react"
import StepUpCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/AppTypes'

/**
* Returns hide button props
**/
export const useHandleQualifiedFilterContainer = () => {
  const [state, setState] = useState<{ hidden : boolean }>({ hidden: false })

  const onHideBtnClick = () => {
    setState(prevState => ({ hidden: !prevState.hidden }))
  }

  return { hidden: state.hidden, onClick: onHideBtnClick }
}

/**
* Returns props for filter buttons; showRemoveBtn visibility boolean
**/
export const useHandleButtons = () => {
  const { filter, dispatch } = useContext(StepUpCtx)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const payload = e.currentTarget.value as AppTypes.RankType

    if(payload !== filter) {
      dispatch({ type: 'SET_FILTER', payload })
    }
  }

  return { onClick, showRemoveBtn: !!filter }
}