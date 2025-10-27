import { useContext, useState } from "react"
import { useGetWindowSize } from "@/helpers/hooks"
import StepUpCtx from "../../context"

export const useHandleSkillsFilterContainer = () => {
  const isMobile = useGetWindowSize()

  const [state, setState] = useState<{ hidden: boolean }>({ hidden: isMobile })

  const onHideBtnClick = () => {
    setState(prevState => ({ hidden: !prevState.hidden }))
  }

  return { hidden: state.hidden, onHideBtnClick }
}

export const useHandleSkillsBtns = () => {
  const { skillsFilter, dispatch } = useContext(StepUpCtx)

  const isMobile = useGetWindowSize()

  const visible = !skillsFilter && !isMobile

  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_SKILLS_FILTER', payload: e.currentTarget.value })
  }

  return { visible, onBtnClick }
}

export const useHandleRemoveFilterBtn = () => {
  const { skillsFilter, dispatch } = useContext(StepUpCtx)

  const visible = !!skillsFilter

  const onClick = () => {
    dispatch({ type: 'SET_SKILLS_FILTER', payload: '' })
  }

  return { visible, onClick }
}