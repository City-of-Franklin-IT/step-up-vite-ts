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
