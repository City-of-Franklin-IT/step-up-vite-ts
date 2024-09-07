import { useContext, useState } from 'react'
import AppContext from '../../../context/App/AppContext'
import { useGetWindowSize } from '../../../helpers'
import styles from './SkillsFilterContainer.module.css'

// Types
import { SkillsFilterContainerProps, SkillsFilterContainerState } from './types'

// Components
import SkillsBtn from '../../buttons/SkillsBtn/SkillsBtn'
import ResetSearchBtn from '../../buttons/ResetSearchBtn/ResetSearchBtn'
import HideBtn from '../../buttons/HideBtn/HideBtn'

function SkillsFilterContainer({ skills, handleResetSearchBtn }: SkillsFilterContainerProps) {
  const { skillsFilter, searchValue } = useContext(AppContext)

  const window = useGetWindowSize()

  const [state, setState] = useState<SkillsFilterContainerState>({ hidden: window > 1025 ? false : true })

  return (
    <div data-testid="skills-filter-container" className={styles.container}>
      <div className={styles.header}>Filter Skills</div>

      <div className="absolute -top-5 right-5">
        <HideBtn 
          setState={setState}
          hidden={state.hidden} />
      </div>

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
        <div className={state.hidden ? 'hidden' : 'flex flex-col justify-around w-full gap-8 md:flex-row md:flex-wrap'}>
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
      
      {skillsFilter && (
        <div data-testid="skills-filter-container-label" className={styles.footer}>Showing { skillsFilter }</div>
      )}
    </div>
  )
}

export default SkillsFilterContainer
