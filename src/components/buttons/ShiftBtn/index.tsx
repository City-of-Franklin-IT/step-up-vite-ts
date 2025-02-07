import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './ShiftBtn.module.css'

// Types
import { ShiftBtnProps } from './types'

function ShiftBtn({ shift, label }: ShiftBtnProps) {
  const { dispatch } = useContext(AppContext)

  return (
    <button
      type="button"
      data-testid="shift-btn"
      onClick={() => dispatch({ type: 'SET_SHIFT_FILTER', payload: shift || null })}
      className={styles.button}>
        <p className={styles.label}>{label}</p>
    </button>
  )
}

export default ShiftBtn