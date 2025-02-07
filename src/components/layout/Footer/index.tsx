import styles from './Footer.module.css'

function Footer() {
  return (
    <footer data-testid="footer" className={styles.footer}>
      <p className={styles.text}>Developed by City of Franklin Information Technology</p>
    </footer>
  )
}

export default Footer
