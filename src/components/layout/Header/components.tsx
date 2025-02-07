import { useContext } from "react"
import { useLocation } from "react-router-dom"
import UserContext from "../../../context/User/UserContext"
import { handleBtn } from "./utils"

// Components
import LogoutBtn from "../../buttons/LogoutBtn"

export const Logout = () => {
  const { user } = useContext(UserContext)

  const location = useLocation()

  return (
    <>
      {user?.email && (
        <div className="flex gap-4">
          {handleBtn(location)}
          <LogoutBtn />
        </div>
      )}
    </>
  )
}