import styles from './QualifiedBtn.module.css'

// Types
import * as AppTypes from '@/context/App/types'

type QualifiedBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, value?: AppTypes.RankType | '', children: React.ReactNode }

function QualifiedBtn(props: QualifiedBtnProps) {

  return (
    <button
      type="button"
      onClick={props.onClick}
      value={props.value}
      className={styles.button}>
        <p className={styles.label}>{props.children}</p>
    </button>
  )
}

export default QualifiedBtn
