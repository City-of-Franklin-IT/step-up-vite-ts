import styles from './SkillsBtn.module.css'

type SkillsBtnProps = { btnProps: { onClick: React.MouseEventHandler<HTMLButtonElement>, value?: string }, children: React.ReactNode }

function SkillsBtn(props: SkillsBtnProps) {

  return (
    <button
      type="button"
      className={styles.button}
      { ...props.btnProps }>
        <p className={styles.label}>{props.children}</p>
    </button>
  )
}

export default SkillsBtn
