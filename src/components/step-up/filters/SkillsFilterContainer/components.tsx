import { useContext } from "react"
import StepUpCtx from "../../context"
import styles from './SkillsFilterContainer.module.css'
import { useHandleSkillsBtns, useHandleRemoveFilterBtn } from './hooks'

// Components
import SkillsBtn from "../../buttons/SkillsBtn"

export const Header = () => {
  const { skillsFilter } = useContext(StepUpCtx)

  if(skillsFilter) return

  return (
    <div className={styles.header}>Filter <small className="italic">by</small> Skill</div>
  )
}

export const Buttons = ({ skills, hidden }: { skills: string[], hidden: boolean }) => {
  if(hidden) return

  return (
    <>
      <RemoveFilterBtn />
      <SkillsBtns skills={skills} />
    </>
  )
}

export const Footer = () => {
  const { skillsFilter } = useContext(StepUpCtx)

  if(!skillsFilter) return

  return (
    <span className={styles.footer}>Showing { skillsFilter }</span>
  )
}

const SkillsBtns = ({ skills }: { skills: string[] }) => {
  const { visible, onBtnClick } = useHandleSkillsBtns()

  if(!visible) return

  return (
    <div className={'flex flex-col justify-around w-full gap-8 md:flex-row md:flex-wrap'}>
      {skills.map(skill => {
        return (
          <SkillsBtn
            key={`skills-btn-${ skill }`} 
            onClick={onBtnClick}
            value={skill}>
              {skill}
          </SkillsBtn>
        )
      })}
    </div>
  )
}

const RemoveFilterBtn = () => {
  const { visible, onClick } = useHandleRemoveFilterBtn()

  if(!visible) return

  return (
    <SkillsBtn
      onClick={onClick}>
        Remove Filter
    </SkillsBtn>
  )
}