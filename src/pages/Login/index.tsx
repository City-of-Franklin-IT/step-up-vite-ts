import { useRedirect } from '../Redirect/hooks'
import styles from './Login.module.css'

// Components
import Layout from '../../components/layout/Layout'
import LoginForm from '../../components/login/LoginForm'

function Login() {
  useRedirect('/home')

  return (
    <Layout>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </Layout>
  )
}

export default Login