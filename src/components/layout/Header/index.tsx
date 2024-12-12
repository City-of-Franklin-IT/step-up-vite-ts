import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import UserContext from "../../../context/User/UserContext"
import styles from './Header.module.css'

// Types
import { ReactElement } from "react"
import { HandleBtnProps } from "./types"

// Components
import LogoutBtn from "../../buttons/LogoutBtn/LogoutBtn"

export const handleBtn = (location: HandleBtnProps['location']) => {
  if(location.pathname !== '/rosters') { // On home page
    return (
      <Link to={'/rosters'} className={styles.rosterBtn}>
        View Rosters
      </Link>
    )
  }

  return ( // On roster page
    <Link to={'/home'} className={styles.rosterBtn}>
      View Step Up
    </Link>
  )
}


export const Logout = (): ReactElement => {
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