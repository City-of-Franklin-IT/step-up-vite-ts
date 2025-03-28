import styles from './LoginBtn.module.css'

function LoginBtn() {
  
  return (
    <button 
      data-testid="login-btn"
      type="submit"
      className={styles.btn}>
        Login
    </button>
  )
}

export default LoginBtn