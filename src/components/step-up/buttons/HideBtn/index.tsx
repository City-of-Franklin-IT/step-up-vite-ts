import closedEyeIcon from '@/assets/icons/closed-eye/closed-eye.svg'
import openEyeIcon from '@/assets/icons/open-eye/open-eye.svg'
import styles from './HideBtn.module.css'

type HideBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, hidden: boolean }

function HideBtn(props: HideBtnProps) {
  const icon = props.hidden ? openEyeIcon : closedEyeIcon

  return (
    <button 
      type="button"
      className={styles.hideBtn}
      onClick={props.onClick}>
        <img src={icon} alt="hiden btn icon" className={styles.icon} />
    </button>
  )
}

export default HideBtn
