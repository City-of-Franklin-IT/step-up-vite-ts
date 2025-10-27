import styles from './SkillsBtn.module.css'

type SkillsBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, value?: string, children: React.ReactNode }

function SkillsBtn(props: SkillsBtnProps) {

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

export default SkillsBtn
