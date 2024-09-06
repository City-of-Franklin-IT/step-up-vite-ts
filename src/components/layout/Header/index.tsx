import { Link } from "react-router-dom"
import styles from './Header.module.css'

// Types
import { HandleBtnProps } from "./types"

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