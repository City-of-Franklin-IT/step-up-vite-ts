import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { infoPopup } from "@/utils/Toast/Toast"
import { useAuth, MOCK_AUTH } from "@/context/Auth"

// BEFORE: Complex token management, state duplication, NODE_ENV checks
// AFTER: Delegation to centralized auth
export const useGetToken = () => {
  const { token } = useAuth()
  return token
}

// BEFORE: Depended on useGetToken state, no redirect
// AFTER: Redirect unauthenticated users, consistent with auth state, expose refreshToken
export const useEnableQuery = () => {
  const { token, isLoading, refreshToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !token) {
      navigate('/')
    }
  }, [token, isLoading, navigate])

  return { enabled: !!token && !isLoading, token, refreshToken }
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

// BEFORE: Checked MSAL state directly
// AFTER: Use centralized auth state
export const useActiveAccount = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

// BEFORE: Used NODE_ENV check
// AFTER: Use MOCK_AUTH flag
export const useUnauthRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (MOCK_AUTH) return

    if (!isLoading && !isAuthenticated) {
      infoPopup('Unauthorized: Please Login')
      navigate('/')
    }
  }, [isAuthenticated, isLoading, navigate])
}

// BEFORE: Used NODE_ENV check
// AFTER: Use MOCK_AUTH flag
export const useRedirectAfterLogin = () => {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (MOCK_AUTH) return

    if (!isLoading && isAuthenticated) {
      const redirectUrl = sessionStorage.getItem('redirectUrl')

      if (redirectUrl) {
        window.location.href = redirectUrl
        sessionStorage.removeItem('redirectUrl')
      }
    } else if (!isLoading && !isAuthenticated) {
      window.location.pathname = '/'
    }
  }, [isAuthenticated, isLoading])
}