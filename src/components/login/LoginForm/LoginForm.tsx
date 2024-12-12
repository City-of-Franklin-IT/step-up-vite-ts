import { useNavigate } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import image from '../../../assets/icons/cof/cof.jpeg'
import { onSubmit } from '.'
import styles from './LoginForm.module.css'

// Types
import { LoginFormUseFormState } from './types'

// Components
import LoginBtn from '../../buttons/LoginBtn/LoginBtn'
import { Email, Password } from "."

function LoginForm() {
  const navigate = useNavigate()

  const methods = useForm<LoginFormUseFormState>({
      defaultValues: {
        email :'',
        password: ''
      }
    })

  return (
    <div data-testid="login-form" className={styles.container}>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, navigate))}>
          <img src={image} alt="cof logo" className="w-fit hidden md:block" />
          <div className={styles.body}>
            <h1 className={styles.title}>Franklin Fire Department Login</h1>
            
            <Email />
            <Password />

            <div className="mt-8">
              <LoginBtn disabled={!methods.formState.isValid && true} />
            </div>

          </div>
        </form>
      </FormProvider>

    </div>
  )
}

export default LoginForm