import { loginUser } from '../../../context/User/UserActions'
import { authPopup, errorPopup } from '../../../utils/Toast/Toast'

// Types
import { OnSubmitProps } from './types'

export const onSubmit = async (formData: OnSubmitProps['formData'], navigate: OnSubmitProps['navigate']): Promise<void> => {
  const result = await loginUser(formData)
  
  if(result.success) { // On success
    setTimeout(() => {
      navigate('/home')
    }, 500)

    return authPopup()
  } else errorPopup(result.msg)
}