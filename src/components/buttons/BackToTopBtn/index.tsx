import styles from './BackToTopBtn.module.css'

// Types
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type BackToTopBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { onClick: MouseEventHandler<HTMLButtonElement> }

function BackToTopBtn(props: BackToTopBtnProps) {
  
  return (
    <button
      type="button"
      data-testid="back-to-top-btn" 
      onClick={props.onClick}
      className={styles.btn}>
        Back To Top
    </button>
  )
}

export default BackToTopBtn