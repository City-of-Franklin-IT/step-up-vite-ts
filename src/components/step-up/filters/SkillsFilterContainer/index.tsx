import styles from './SkillsFilterContainer.module.css'
import { useHandleSkillsFilterContainer } from './hooks'

// Components
import HideBtn from '../../buttons/HideBtn'
import * as Components from './components'

function SkillsFilterContainer({ skills }: { skills: string[] }) {
  const { hidden, onHideBtnClick } = useHandleSkillsFilterContainer()

  return (
    <div className={styles.container}>
      <Components.Header />
      <div className="absolute -top-5 right-5">
        <HideBtn 
          onClick={onHideBtnClick}
          hidden={hidden} />
      </div>
      <Components.Buttons 
        skills={skills}
        hidden={hidden} />
      <Components.Footer />
    </div>
  )
}

export default SkillsFilterContainer
