import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../../context/User/UserContext"
import { logoutUser } from "../../../context/User/UserActions"
import { infoPopup, errorPopup } from "../../../utils/Toast/Toast"

// Types
import { HandleLogoutClick } from "./types"

export const handleLogoutClick = async (navigate: HandleLogoutClick['navigate'], dispatch: HandleLogoutClick['dispatch']): Promise<void> => { // Remove user cookie on btn click and navigate to Login page
  const response = await logoutUser()

  if(response.success) {
    dispatch({ type: 'SET_USER', payload: undefined }) // Reset User ctx
    infoPopup('Logged Out')
    return navigate('/login')
  } else errorPopup()
}

export const useHandleLogout = (): () => void => { // Handle user logout
  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  return () => {
    logoutUser()
      .then(result => {
        if(result.success) {
          infoPopup('Logged Out')
          dispatch({ type: 'SET_USER', payload: undefined })
          navigate('/login')
        } else errorPopup('Something Went Wrong')
      }) 
  } 
}