import styles from './ShiftBtn.module.css'

type ShiftBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, value?: 'A' | 'B' | 'C', children: React.ReactNode }

function ShiftBtn(props: ShiftBtnProps) {

  return (
    <button
      type="button"
      value={props.value}
      onClick={props.onClick}
      className={styles.button}>
        <p className={styles.label}>{props.children}</p>
    </button>
  )
}

export default ShiftBtn