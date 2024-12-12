import { useContext } from "react"
import AppContext from "../../../../context/App/AppContext"
import styles from './SkillsFilterContainer.module.css'

// Types
import { ReactElement } from "react"

// Components
import SkillsBtn from "../../../buttons/SkillsBtn/SkillsBtn"

export const Header = () => {
  const { skillsFilter } = useContext(AppContext)

  return (
    <div className={!skillsFilter ? styles.header : 'hidden'}>Filter <small className="italic">by</small> Skill</div>
  )
}

export const Buttons = ({ hidden, skills }: { hidden: boolean, skills: string[] }): ReactElement => {
  const { skillsFilter } = useContext(AppContext)

  return (
    <>
      {skillsFilter ? (
        <div className="flex gap-6">
          <SkillsBtn
            label={'Remove Filter'}
            type={''} />
        </div>
      ) : (
        <div className={hidden ? 'hidden' : 'flex flex-col justify-around w-full gap-8 md:flex-row md:flex-wrap'}>
          {skills.map(obj => {
            return (
              <SkillsBtn
                key={`${ obj }-skill-button`} 
                label={obj} 
                type={obj} />
            )
          })}
        </div>
      )}
    </>
  )
}

export const Footer = () => {
  const { skillsFilter } = useContext(AppContext)

  return (
    <>
      {skillsFilter && (
        <div data-testid="skills-filter-container-label" className={styles.footer}>Showing { skillsFilter }</div>
      )}
    </>
  )
}