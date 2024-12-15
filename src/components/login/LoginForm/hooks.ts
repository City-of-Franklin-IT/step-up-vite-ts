import { useForm } from "react-hook-form"

// Types
import { LoginFormUseFormState } from "./types"

export const useLoginForm = () => {
  return useForm<LoginFormUseFormState>({
        defaultValues: {
          email :'',
          password: ''
        }
      })
}