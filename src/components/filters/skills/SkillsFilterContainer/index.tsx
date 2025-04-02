import { useState } from 'react'
import { useGetWindowSize } from '../../../../helpers/hooks'
import styles from './SkillsFilterContainer.module.css'

// Types
import { SkillsFilterContainerState } from './types'

// Components
import HideBtn from '../../../buttons/HideBtn'
import * as Components from './components'

function SkillsFilterContainer({ skills }: { skills: string[] }) {
  const hidden = useGetWindowSize()

  const [state, setState] = useState<SkillsFilterContainerState>({ hidden })

  return (
    <div data-testid="skills-filter-container" className={styles.container}>
      <Components.Header />
      <div className="absolute -top-5 right-5">
        <HideBtn 
          onClick={() => setState(prevState => ({ ...prevState,  hidden: !prevState.hidden }))}
          hidden={state.hidden} />
      </div>
      <Components.Buttons skills={skills} />
      <Components.Footer />
    </div>
  )
}

export default SkillsFilterContainer
