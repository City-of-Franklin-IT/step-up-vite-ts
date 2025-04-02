import styles from './Layout.module.css'

// Components
import Header from '../Header'
import Footer from '../Footer'

// Types
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  
  return (
    <div data-testid="layout" className={styles.layout}>
      <Header />
      <main data-testid="main">
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
