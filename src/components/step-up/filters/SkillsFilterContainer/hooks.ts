import { useContext, useState } from "react"
import StepUpCtx from "../../context"

/**
* Returns hide button props and buttons visibility boolean
**/
export const useHandleSkillsFilterContainer = () => {
  const [state, setState] = useState<{ hidden: boolean }>({ hidden: false })

  const onHideBtnClick = () => {
    setState(prevState => ({ hidden: !prevState.hidden }))
  }

  return { hidden: state.hidden, onClick: onHideBtnClick }
}

/**
* Returns skills buttons visibility boolean and onClick handler
**/
export const useHandleSkillsBtns = () => {
  const { skillsFilter, dispatch } = useContext(StepUpCtx)

  const visible = !skillsFilter

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_SKILLS_FILTER', payload: e.currentTarget.value })
  }

  return { visible, onClick }
}

/**
* Returns remove filter button visibility boolean and onClick handler
**/
export const useHandleRemoveFilterBtn = () => {
  const { skillsFilter, dispatch } = useContext(StepUpCtx)

  const visible = !!skillsFilter

  const onClick = () => {
    dispatch({ type: 'SET_SKILLS_FILTER', payload: '' })
  }

  return { visible, onClick }
}