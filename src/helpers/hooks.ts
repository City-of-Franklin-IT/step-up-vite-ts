import { useState, useEffect } from "react"
import { useMsal } from "@azure/msal-react"
import { NODE_ENV } from "@/config"

export const useGetToken = () => {
  const [state, setState] = useState<{ token: string | undefined, isLoading: boolean }>({ token: undefined, isLoading: true })

  const { instance, accounts, inProgress } = useMsal()

  if(NODE_ENV === 'development') {
    return { token: 'dev-token', isLoading: false }
  }

  const checkToken = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }))

    const activeAccount = instance.getActiveAccount()

    if(!activeAccount && accounts.length === 0) {
      setState(prevState => ({ ...prevState, isLoading: false }))
      window.location.href = '/'
      return
    }

    if(!activeAccount && accounts.length > 0) {
      setState(prevState => ({ ...prevState, isLoading: false }))
      instance.setActiveAccount(accounts[0])
      return
    }

    if(activeAccount?.idTokenClaims && activeAccount.idTokenClaims.exp) {
      const expiresOn = activeAccount.idTokenClaims.exp * 1000
      const now = Date.now()

      if(expiresOn > now + 3000000) {
        setState({ token: activeAccount.idToken, isLoading: false })
        return
      }

      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        forceRefresh: true,
        redirectUri: "https://fireapps.franklintn.gov/step-up/redirect.html"
      }

      const isEdge = /Edg/.test(navigator.userAgent)
      
      const response = isEdge 
        ? await instance.acquireTokenPopup(request)
        : await instance.acquireTokenSilent(request)

      setState({ token: response.idToken, isLoading: false })
      return
    }

    if(activeAccount && !activeAccount.idTokenClaims) {
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        redirectUri: "https://fireapps.franklintn.gov/step-up/redirect.html"
      }

      const isEdge = /Edg/.test(navigator.userAgent)
      
      const response = isEdge
        ? await instance.acquireTokenPopup(request)
        : await instance.acquireTokenSilent(request)

      setState({ token: response.idToken, isLoading: false })
      return
    }

    setState(prevState => ({ ...prevState, isLoading: false }))
  }

  useEffect(() => {
    if(inProgress !== 'none') { // Wait for instance to fully initialize
      return
    }

    checkToken()

    const intervalId = setInterval(checkToken, 4 * 60 * 1000) // Check every 4 minutes
    
    return () => clearInterval(intervalId)
  }, [inProgress, accounts.length])

  return state
}

export const useEnableQuery = () => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const { token, isLoading } = useGetToken()

  useEffect(() => {
    if(isLoading) {
      setState({ enabled: false })
    } else setState({ enabled: !!token })
  }, [token, isLoading])

  return { enabled: state.enabled, token }
}

export const useGetWindowSize = (): boolean => { // Get window size
  const [state, setState] = useState<{ width: number }>({ width: window.innerWidth })

  useEffect(() => {
    const handleResize = () => setState({ width: window.innerWidth })

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return state.width < 1025
}

export const useActiveAccount = () => {
  const [state, setState] = useState<{ authenticated: boolean }>({ authenticated: false })
  const { instance, inProgress } = useMsal()

  useEffect(() => {
    if(inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      setState({ authenticated: !!activeAccount })
    }
  }, [instance, inProgress])

  return state.authenticated
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const development = NODE_ENV === 'development'

  useEffect(() => {
    if(development) return

    if(inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()

      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl')

        if(redirectUrl) {        
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else {
        window.location.pathname = '/'
      }
    }
  }, [inProgress, development, instance])
}