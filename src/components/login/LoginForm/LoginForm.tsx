import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import image from '../../../assets/icons/cof/cof.jpeg'
import { onSubmit } from '.'
import styles from './LoginForm.module.css'

// Types
import { LoginFormUseFormState } from './types'

// Components
import LoginBtn from '../../buttons/LoginBtn/LoginBtn'

function LoginForm() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { isValid } } = useForm<LoginFormUseFormState>({
      defaultValues: {
        email :'',
        password: ''
      }
    })

  return (
    <div data-testid="login-form" className={styles.container}>
      <form onSubmit={handleSubmit(formData => onSubmit(formData, navigate))}>
        <img src={image} alt="cof logo" className="w-fit hidden md:block" />
        <div className={styles.body}>
          <h1 className={styles.title}>Franklin Fire Department Login</h1>
          
            <div className={styles.inputSection}>
              <div className="flex flex-col">
                <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                  { ...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required'
                    }
                  }) }
                  type="email" 
                  className={styles.input} />
              </div>
            </div>

            <div className={styles.inputSection}>
              <div className="flex flex-col">
                <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                  { ...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required'
                    }
                  }) }
                  type="password" 
                  className={styles.input} />
              </div>
            </div>

          <div className="flex flex-col mt-8 gap-3">
            <LoginBtn disabled={!isValid && true} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm