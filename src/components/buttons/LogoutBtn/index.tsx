import { useMsal } from "@azure/msal-react"
import useHandleLogoutRedirect from "../../../context/Auth/hooks/useHandleLogoutRedirect"
import styles from './LogoutBtn.module.css'

function LogoutBtn() {
  const { instance } = useMsal()
  const activeAccount = instance.getActiveAccount()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  const visible = !!activeAccount

  if(!visible) return null

  return (
    <button 
      type="button"
      onClick={handleLogoutRedirect}
      className={styles.btn}>
        Logout
    </button>
  )
}

export default LogoutBtn