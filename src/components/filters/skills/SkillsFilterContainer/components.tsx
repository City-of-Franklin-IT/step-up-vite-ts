import { useContext } from "react"
import AppContext from "../../../../context/App/AppContext"
import { useGetWindowSize } from "../../../../helpers/hooks"
import styles from './SkillsFilterContainer.module.css'

// Components
import SkillsBtn from "../../../buttons/SkillsBtn"

export const Header = () => {
  const { skillsFilter } = useContext(AppContext)

  return (
    <div className={!skillsFilter ? styles.header : 'hidden'}>Filter <small className="italic">by</small> Skill</div>
  )
}

export const Buttons = ({ skills }: { skills: string[] }) => {

  return (
    <>
      <RemoveFilterBtn />
      <SkillsBtns skills={skills} />
    </>
  )
}

export const Footer = () => {
  const { skillsFilter } = useContext(AppContext)

  if(!skillsFilter) return null

  return (
    <span data-testid="skills-filter-container-label" className={styles.footer}>Showing { skillsFilter }</span>
  )
}

const SkillsBtns = ({ skills }: { skills: string[] }) => {
  const { skillsFilter, dispatch } = useContext(AppContext)

  const hidden = useGetWindowSize()

  if(!!skillsFilter || hidden) return null

  return (
    <div className={'flex flex-col justify-around w-full gap-8 md:flex-row md:flex-wrap'}>
      {skills.map(skill => {
        return (
          <SkillsBtn
            key={`${ skill }-skill-button`} 
            label={skill}
            onClick={() => dispatch({ type: 'SET_SKILLS_FILTER', payload: skill })} />
        )
      })}
    </div>
  )
}

const RemoveFilterBtn = () => {
  const { skillsFilter, dispatch } = useContext(AppContext)

  if(!skillsFilter) return null

  return (
    <SkillsBtn
      label={'Remove Filter'}
      onClick={() => dispatch({ type: 'SET_SKILLS_FILTER', payload: '' })} />
  )
}