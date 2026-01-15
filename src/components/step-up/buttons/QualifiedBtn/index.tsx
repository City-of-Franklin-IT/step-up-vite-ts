import styles from './QualifiedBtn.module.css'

// Types
import * as AppTypes from '@/context/App/AppTypes'

type QualifiedBtnProps = { btnProps: { onClick: React.MouseEventHandler<HTMLButtonElement>, value?: AppTypes.RankType | '' }, children: React.ReactNode }

function QualifiedBtn(props: QualifiedBtnProps) {

  return (
    <button
      type="button"
      className={styles.button}
      { ...props.btnProps }>
        <p className={styles.label}>{props.children}</p>
    </button>
  )
}

export default QualifiedBtn
