import useHandleLoginRedirect from '../../../context/Auth/hooks/useHandleLoginRedirect'
import styles from './LoginBtn.module.css'

function LoginBtn() {
  const handleLoginRedirect = useHandleLoginRedirect()

  return (
    <button 
      data-testid="login-btn"
      type="submit"
      className={styles.btn}
      onClick={handleLoginRedirect}>
        Login
    </button>
  )
}

export default LoginBtn