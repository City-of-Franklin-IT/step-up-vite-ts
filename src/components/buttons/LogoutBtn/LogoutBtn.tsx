import styles from './LogoutBtn.module.css'

// Types
import { useHandleLogout } from '.'

function LogoutBtn() {
  const handleLogout = useHandleLogout()

  return (
    <button
      data-testid="header-btn"
      type="button"
      className={styles.btn}
      onClick={handleLogout}>
        Logout
    </button>
  )
}

export default LogoutBtn