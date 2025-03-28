import { Link } from 'react-router-dom'
import { APP_TITLE } from '../../../config'
import styles from './Header.module.css'

// Components
import * as Components from './components'

function Header() {

  return (
    <header data-testid="header" className={styles.header}>
      <Link to={'/home'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>Franklin Fire Department</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>
      <Components.Buttons />
    </header>
  )
}

export default Header
