import image from '../../../assets/icons/cof/cof.jpeg'
import styles from './LoginForm.module.css'

// Components
import LoginBtn from '../../buttons/LoginBtn'

function LoginForm() {

  return (
    <div className={styles.container}>
      <img src={image} alt="cof logo" className="w-fit hidden lg:block" />
      <div className={styles.body}>
        <h2 className={styles.title}>Franklin Fire Department Login</h2>
        
        <div className="p-4">
          <LoginBtn />
        </div>
      </div>
    </div>
  )
}

export default LoginForm