import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './SkillsFilterContainer.module.css'

// Types
import { SkillsFilterContainerProps } from './types'

// Components
import SkillsBtn from '../../buttons/SkillsBtn/SkillsBtn'
import ResetSearchBtn from '../../buttons/ResetSearchBtn/ResetSearchBtn'

function SkillsFilterContainer({ skills, handleResetSearchBtn }: SkillsFilterContainerProps) {
  const { skillsFilter, searchValue } = useContext(AppContext)

  return (
    <div data-testid="skills-filter-container" className={styles.container}>
      <div className={styles.header}>Filter Skills</div>
      {skillsFilter ? (
        <div className="flex gap-6">
          <SkillsBtn
            label={'Remove Filter'}
            type={''} />
          {searchValue ? (
              <ResetSearchBtn 
                handleResetSearchBtn={() => handleResetSearchBtn()} />
            ) : null}
        </div>
      ) : (
        <>
          {skills.map(obj => {
            return (
              <SkillsBtn
                key={`${ obj }-skill-button`} 
                label={obj} 
                type={obj} />
            )
          })}
        </>
      )}
      {skillsFilter && (
        <div data-testid="skills-filter-container-label" className={styles.footer}>Showing { skillsFilter }</div>
      )}
    </div>
  )
}

export default SkillsFilterContainer
