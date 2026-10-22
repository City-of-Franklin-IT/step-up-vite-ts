import { useContext } from "react"
import StepUpCtx from "../../context"

/**
* Returns skills filter select value and change handler
**/
export const useHandleSkillsFilter = () => {
  const { skillsFilter, dispatch } = useContext(StepUpCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_SKILLS_FILTER', payload: e.target.value })
  }

  return { value: skillsFilter, onChange }
}

/**
* Returns skills filter button click handler and visibility
**/
export const useHandleSkillsBtns = () => {
  const { skillsFilter, dispatch } = useContext(StepUpCtx)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.currentTarget as HTMLButtonElement).value
    dispatch({ type: 'SET_SKILLS_FILTER', payload: value })
  }

  return { onClick, visible: !skillsFilter }
}

/**
* Returns remove filter button handler and visibility
**/
export const useHandleRemoveFilterBtn = () => {
  const { skillsFilter, dispatch } = useContext(StepUpCtx)

  const onClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_SKILLS_FILTER', payload: '' })
  }

  return { onClick, visible: !!skillsFilter }
}
