import { useFormContext } from 'react-hook-form'
import { loginUser } from '../../../context/User/UserActions'
import { authPopup, errorPopup } from '../../../utils/Toast/Toast'
import styles from './LoginForm.module.css'

// Types
import { OnSubmitProps, LoginFormUseFormState } from './types'

export const onSubmit = async (formData: OnSubmitProps['formData'], navigate: OnSubmitProps['navigate']): Promise<void> => {
  const result = await loginUser(formData)
  
  if(result.success) { // On success
    setTimeout(() => {
      navigate('/home')
    }, 500)

    return authPopup()
  } else errorPopup(result.msg)
}

export const Email = () => {
  const methods = useFormContext<LoginFormUseFormState>()

  return (
    <div className={styles.inputSection}>
      <div className="flex flex-col">
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          { ...methods.register('email', {
            required: {
              value: true,
              message: 'Email is required'
            }
          }) }
          type="email" 
          className={styles.input} />
      </div>
    </div>
  )
}

export const Password = () => {
  const methods = useFormContext<LoginFormUseFormState>()

  return (
    <div className={styles.inputSection}>
      <div className="flex flex-col">
        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          type="password" 
          className={styles.input}
          { ...methods.register('password', {
            required: 'Password is required'
          }) } />
      </div>
    </div>
  )
}