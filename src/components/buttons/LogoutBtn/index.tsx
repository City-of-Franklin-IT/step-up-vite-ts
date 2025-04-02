import { useMsal } from "@azure/msal-react"
import useHandleLogoutRedirect from "../../../context/Auth/hooks/useHandleLogoutRedirect"

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
      className="btn rounded-none uppercase hover:btn-primary">
        Logout
    </button>
  )
}

export default LogoutBtn