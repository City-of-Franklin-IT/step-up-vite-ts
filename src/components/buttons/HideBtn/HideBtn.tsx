import styles from './HideBtn.module.css'

// Types
import { HideBtnProps } from './types'

function HideBtn({ setState, label }: HideBtnProps) {
  return (
    <button 
      type="button"
      data-testid="hide-btn"
      className={styles.hideBtn}
      onClick={() => setState(prevState => ({ ...prevState,  hidden: !prevState.hidden }))}>
        {label}
    </button>
  )
}

export default HideBtn
