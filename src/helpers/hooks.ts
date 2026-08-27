import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { infoPopup } from "@/utils/Toast/Toast"
import { useAuth, MOCK_AUTH } from "@/context/Auth"

export const useGetToken = () => {
  const { token } = useAuth()
  return token
}

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

export const useActiveAccount = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

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

export const withTokenRefresh = async <T>(
  fn: () => Promise<T>,
  refresh: () => Promise<unknown>
): Promise<T> => {
  try {
    return await fn()
  } catch (e) {
    if (e instanceof Error && e.message === '401') await refresh()
    throw e
  }
}