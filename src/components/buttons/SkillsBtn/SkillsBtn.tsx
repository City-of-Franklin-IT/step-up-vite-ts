import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './SkillsBtn.module.css'

// Types
import { SkillsBtnProps } from './types'

function SkillsBtn({ type, label }: SkillsBtnProps) {
  const { dispatch } = useContext(AppContext)

  return (
    <button
      type="button"
      data-testid="skills-btn"
      onClick={() => dispatch({ type: 'SET_SKILLS_FILTER', payload: type ? type : '' })}
      className={styles.button}>
      <p className={styles.label}>{label}</p>
    </button>
  )
}

export default SkillsBtn
