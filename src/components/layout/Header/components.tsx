import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import styles from './Header.module.css'

// Components
import LogoutBtn from "../../buttons/LogoutBtn"

export const Buttons = () => {

  return (
    <div className="flex gap-4">
      <RostersBtn />
      <StepUpBtn />
      <LogoutBtn />
    </div>
  )
}

const RostersBtn = () => {
  const location = useLocation()

  if(location.pathname === '/rosters') return null

  return (
    <Link to={'/rosters'} className={styles.rosterBtn}>
      View Rosters
    </Link>
  )
}

const StepUpBtn = () => {
  const location = useLocation()

  if(location.pathname === '/step-up') return null

  return ( 
    <Link to={'/home'} className={styles.rosterBtn}>
      View Step Up
    </Link>
  )
} 