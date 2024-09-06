import closedEyeIcon from '../../../assets/icons/closed-eye/closed-eye.svg'
import openEyeIcon from '../../../assets/icons/open-eye/open-eye.svg'
import styles from './HideBtn.module.css'

// Types
import { HideBtnProps } from './types'

function HideBtn({ setState, hidden }: HideBtnProps) {
  return (
    <button 
      type="button"
      data-testid="hide-btn"
      className={styles.hideBtn}
      onClick={() => setState(prevState => ({ ...prevState,  hidden: !prevState.hidden }))}>
        <img src={hidden ? openEyeIcon : closedEyeIcon} alt="hiden btn icon" className={styles.icon} />
    </button>
  )
}

export default HideBtn
