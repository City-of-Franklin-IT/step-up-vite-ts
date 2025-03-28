import styles from './QualifiedBtn.module.css'

// Types
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type QualifiedBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { onClick: MouseEventHandler<HTMLButtonElement>, label: string }

function QualifiedBtn(props: QualifiedBtnProps) {

  return (
    <button
      type="button"
      data-testid="qualified-btn"
      onClick={props.onClick}
      className={styles.button}>
        <p className={styles.label}>{props.label}</p>
    </button>
  )
}

export default QualifiedBtn
