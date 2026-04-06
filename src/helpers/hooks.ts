import { useState, useEffect, useCallback } from "react"
import { useMsal } from "@azure/msal-react"
import { useNavigate } from "react-router"
import { NODE_ENV } from "@/config"
import { infoPopup } from "@/utils/Toast/Toast"
import { acquireRequest } from "@/context/Auth/config"

export const useGetToken = () => {
  const isDev = NODE_ENV === 'development'
  const [state, setState] = useState<{ token: string | undefined, isLoading: boolean }>({
    token: isDev ? 'dev-token' : undefined,
    isLoading: !isDev
  })

  const { instance, accounts, inProgress } = useMsal()

  const checkToken = useCallback(async () => {
    // 1. Check if accounts exist
    const activeAccount = instance.getActiveAccount()
    if (!activeAccount && accounts.length === 0) {
      setState({ token: undefined, isLoading: false })
      window.location.href = '/'
      return
    }

    // 2. Promote first account if needed
    if (!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      setState(prev => ({ ...prev, isLoading: false }))
      return
    }

    // 3. Check if token is still fresh
    const exp = activeAccount?.idTokenClaims?.exp
    if (exp && exp * 1000 > Date.now() + 3_000_000) {
      setState({ token: activeAccount!.idToken, isLoading: false })
      return
    }

    // 4. Try silent refresh, fall back to redirect
    try {
      const response = await instance.acquireTokenSilent(acquireRequest(activeAccount!))
      setState({ token: response.idToken, isLoading: false })
    } catch {
      instance.acquireTokenRedirect(acquireRequest(activeAccount!))
    }
  }, [instance, accounts])

  useEffect(() => {
    if (isDev || inProgress !== 'none') return

    checkToken()

    // Refresh token every 4 minutes
    const id = setInterval(checkToken, 4 * 60 * 1000)
    return () => clearInterval(id)
  }, [isDev, inProgress, accounts.length, checkToken])

  return state
}

export const useEnableQuery = () => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })
  const { token, isLoading } = useGetToken()

  useEffect(() => {
    setState({ enabled: !isLoading && !!token })
  }, [token, isLoading])

  return { enabled: state.enabled, token }
}

export const useGetWindowSize = (): boolean => {
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
    if (NODE_ENV === 'development') return

    if (inProgress === 'none') {
      setState({ authenticated: !!instance.getActiveAccount() })
    }
  }, [instance, inProgress])

  return NODE_ENV === 'development' ? true : state.authenticated
}

export const useUnauthRedirect = () => {
  const { instance, inProgress } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if (NODE_ENV === 'development') return

    if (inProgress === 'none' && !instance.getActiveAccount()) {
      infoPopup('Unauthorized: Please Login')
      navigate('/')
    }
  }, [inProgress, instance, navigate])
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const development = NODE_ENV === 'development'

  useEffect(() => {
    if (development) return

    if (inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()

      if (activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl')

        if (redirectUrl) {
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else {
        window.location.pathname = '/'
      }
    }
  }, [inProgress, development, instance])
}