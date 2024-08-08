import styles from './ResetSearchBtn.module.css'

// Types
import { ResetSearchBtnProps } from './types'

function ResetSearchBtn({ handleResetSearchBtn }: ResetSearchBtnProps) {
  return (
    <button
      data-testid="reset-search-btn"
      onClick={() => handleResetSearchBtn()}
      className={styles.button}>
        <p className={styles.label}>Clear Search</p>
    </button>
  )
}

export default ResetSearchBtn
