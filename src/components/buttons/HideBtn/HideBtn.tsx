import styles from './HideBtn.module.css'

// Types
import { HideBtnProps } from './types'

function HideBtn({ setState, label }: HideBtnProps) {
  return (
    <button 
      type="button"
      className={styles.hideBtn}
      onClick={() => setState(prevState => ({ ...prevState,  hidden: !prevState.hidden }))}>
      {label}
    </button>
  )
}

export default HideBtn
