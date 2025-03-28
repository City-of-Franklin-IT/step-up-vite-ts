import styles from './SkillsBtn.module.css'

// Types
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type SkillsBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { onClick: MouseEventHandler<HTMLButtonElement>, label: string }

function SkillsBtn(props: SkillsBtnProps) {

  return (
    <button
      type="button"
      data-testid="skills-btn"
      onClick={props.onClick}
      className={styles.button}>
      <p className={styles.label}>{props.label}</p>
    </button>
  )
}

export default SkillsBtn
