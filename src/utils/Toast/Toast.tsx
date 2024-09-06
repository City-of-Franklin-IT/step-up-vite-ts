import { toast } from 'react-toastify'
import styles from './Toast.module.css'

// Icons
import authIcon from '../../assets/icons/auth/auth.svg'
import infoIcon from '../../assets/icons/info/info.svg'
import errorIcon from '../../assets/icons/error/error.svg'

export const errorPopup = (msg?: string | undefined): void => { // Error popup
  const content = (
    <div className={`${ styles.popup } ${ styles.errorPopup }`}>
      <img src={errorIcon} alt="error icon" className={styles.icon} />
      <div className="text-center">{msg || "Error"}</div>
    </div>
  )

  toast(content, {
    closeButton: false,
    autoClose: 5000,
    position: "bottom-center",
    theme: "transparent",
    closeOnClick: true
  })
}

export const authPopup = (): void => { // Authentication popup
  const content = (
    <div className={`${ styles.popup } ${ styles.authPopup }`}>
      <img src={authIcon} alt="auth icon" className={styles.icon} />
      <div className="text-center">Authenticated</div>
    </div>
  )

  toast(content, {
    closeButton: false,
    autoClose: 5000,
    position: "bottom-center",
    theme: "transparent",
    closeOnClick: true
  })
}

export const infoPopup = (msg: string): void => { // Info popup
  const content = (
    <div className={`${ styles.popup } ${ styles.infoPopup }`}>
      <img src={infoIcon} alt="info icon" className={styles.icon} />
      <div className="text-center">{msg}</div>
    </div>
  )

  toast(content, {
    closeButton: false,
    autoClose: 5000,
    position: "bottom-center",
    theme: "transparent",
    closeOnClick: true
  })
}