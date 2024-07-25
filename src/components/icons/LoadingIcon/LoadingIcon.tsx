import icon from '../../../assets/icons/loading/loading.svg'
import styles from './LoadingIcon.module.css'

// Types
import { LoadingIconProps } from "./types"

function LoadingIcon({ width, height }: LoadingIconProps) {
  return (
    <img src={icon} width={width} height={height} className={styles.loadingIcon} />
  )
}

export default LoadingIcon
