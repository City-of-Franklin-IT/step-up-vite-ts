import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"

export const useHandleAuth = () => {
  const { instance, accounts, inProgress } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if(inProgress !== "none") {
      return
    }

    const activeAccount = instance.getActiveAccount()

    if(accounts.length === 0 || !activeAccount) {
      window.location.href = 'https://fireapps.franklintn.gov/'
    } else {
      navigate('/home')
    }
  }, [instance, accounts.length, inProgress, navigate])
}