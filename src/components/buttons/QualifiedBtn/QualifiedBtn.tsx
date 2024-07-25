import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './QualifiedBtn.module.css'

// Types
import { QualifiedBtnProps } from './types'

function QualifiedBtn({ type, label }: QualifiedBtnProps) {
  const { dispatch } = useContext(AppContext)

  return (
    <button
    onClick={() => dispatch({ type: 'SET_FILTER', payload: type ? type : '' })}
    className={styles.button}>
      <p className={styles.label}>{label}</p>
    </button>
  )
}

export default QualifiedBtn
