import closedEyeIcon from '../../../assets/icons/closed-eye/closed-eye.svg'
import openEyeIcon from '../../../assets/icons/open-eye/open-eye.svg'
import styles from './HideBtn.module.css'

// Types
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type HideBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { onClick: MouseEventHandler<HTMLButtonElement>, hidden: boolean }

function HideBtn(props: HideBtnProps) {
  
  return (
    <button 
      type="button"
      data-testid="hide-btn"
      className={styles.hideBtn}
      onClick={props.onClick}>
        <img src={props.hidden ? openEyeIcon : closedEyeIcon} alt="hiden btn icon" className={styles.icon} />
    </button>
  )
}

export default HideBtn
