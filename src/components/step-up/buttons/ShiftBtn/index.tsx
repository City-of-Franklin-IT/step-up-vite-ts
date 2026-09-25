import styles from './ShiftBtn.module.css'

type ShiftBtnProps = { btnProps: { onClick: React.MouseEventHandler<HTMLButtonElement>, value?: 'A' | 'B' | 'C' }, children: React.ReactNode }

function ShiftBtn(props: ShiftBtnProps) {

  return (
    <button
      type="button"
      className={styles.button}
      { ...props.btnProps }>
        <p className={styles.label}>{props.children}</p>
    </button>
  )
}

export default ShiftBtn