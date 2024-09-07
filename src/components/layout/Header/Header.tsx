import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import UserContext from '../../../context/User/UserContext'
import { APP_TITLE } from '../../../config'
import { handleBtn } from '.'
import styles from './Header.module.css'

// Components
import LogoutBtn from '../../buttons/LogoutBtn/LogoutBtn'

function Header() {
  const { user } = useContext(UserContext)

  const location = useLocation()

  return (
    <header data-testid="header" className={styles.header}>
      <Link to={'/home'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>Franklin Fire Department</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>
      {user?.email && (
        <div className="flex gap-4">
          {handleBtn(location)}
          <LogoutBtn />
        </div>
      )}
    </header>
  )
}

export default Header
