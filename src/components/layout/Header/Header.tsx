import { Link, useLocation } from 'react-router-dom'
import { APP_TITLE } from '../../../config'
import { handleBtn } from '.'
import styles from './Header.module.css'

function Header() {
  const location = useLocation()

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>Franklin Fire Department</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>
      {handleBtn(location)}
    </header>
  )
}

export default Header
