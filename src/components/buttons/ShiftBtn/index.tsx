import styles from './ShiftBtn.module.css'

// Types
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type ShiftBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { onClick: MouseEventHandler<HTMLButtonElement>, label: string }

function ShiftBtn(props: ShiftBtnProps) {

  return (
    <button
      type="button"
      data-testid="shift-btn"
      onClick={props.onClick}
      className={styles.button}>
        <p className={styles.label}>{props.label}</p>
    </button>
  )
}

export default ShiftBtn