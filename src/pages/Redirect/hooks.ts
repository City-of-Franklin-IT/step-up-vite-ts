import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"

export const useRedirect = (onAuth?: string) => {
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  const navigate = useNavigate()

  const isReady = instance && inProgress === 'none'

  useEffect(() => {
    if(isReady) {
      if(activeAccount) {
        if(onAuth) {
          navigate(onAuth)
        } else null
      } else navigate('/')
    }

  }, [isReady, activeAccount, navigate, onAuth])
}