import { useState } from 'react'
import { useGetWindowSize } from '../../../../helpers'
import styles from './SkillsFilterContainer.module.css'

// Types
import { SkillsFilterContainerProps, SkillsFilterContainerState } from './types'

// Components
import HideBtn from '../../../buttons/HideBtn/HideBtn'
import { Header, Buttons, Footer } from '.'

function SkillsFilterContainer({ skills }: SkillsFilterContainerProps) {
  const hidden = useGetWindowSize()

  const [state, setState] = useState<SkillsFilterContainerState>({ hidden })

  return (
    <div data-testid="skills-filter-container" className={styles.container}>
      <Header />
      <div className="absolute -top-5 right-5">
        <HideBtn 
          setState={setState}
          hidden={state.hidden} />
      </div>
      <Buttons 
        hidden={state.hidden}
        skills={skills} />
      <Footer />
    </div>
  )
}

export default SkillsFilterContainer
