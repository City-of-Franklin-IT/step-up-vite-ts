import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useMsal } from '@azure/msal-react'
import { acquireRequest } from '@/context/Auth/config'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | undefined
  isLoading: boolean
  refreshToken: () => Promise<string | undefined>
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_TOKEN = 'dev-token-12345'

export const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'

export function AuthCtxProvider({ children }: { children: ReactNode }) {
  const { instance, accounts, inProgress } = useMsal()
  const [token, setToken] = useState<string | undefined>(undefined)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (MOCK_AUTH) {
      setToken(MOCK_TOKEN)
      setIsReady(true)
      return
    }

    if (inProgress !== 'none') {
      return
    }

    const activeAccount = instance.getActiveAccount()

    // 1. Check if accounts exist
    if (!activeAccount && accounts.length === 0) {
      setToken(undefined)
      setIsReady(true)
      return
    }

    // 2. Promote first account if needed
    if (!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      const newActiveAccount = instance.getActiveAccount()

      if (newActiveAccount) {
        instance.acquireTokenSilent({
          ...acquireRequest(newActiveAccount),
          account: newActiveAccount
        }).then((response) => {
          setToken(response.idToken)
          setIsReady(true)
        }).catch(() => {
          setToken(undefined)
          setIsReady(true)
        })
      }
      return
    }

    // 3. Use existing active account - MUST acquire token
    if (activeAccount) {
      // NOTE: activeAccount.idToken is undefined for cached accounts!
      // You MUST call acquireTokenSilent() to get a valid token
      instance.acquireTokenSilent({
        ...acquireRequest(activeAccount),
        account: activeAccount
      }).then((response) => {
        setToken(response.idToken)
        setIsReady(true)
      }).catch(() => {
        setToken(undefined)
        setIsReady(true)
      })
    } else {
      setToken(undefined)
      setIsReady(true)
    }
  }, [inProgress, accounts.length, instance, MOCK_AUTH])

  const refreshToken = async (): Promise<string | undefined> => {
    if (MOCK_AUTH) return MOCK_TOKEN
    const activeAccount = instance.getActiveAccount()
    if (!activeAccount) return undefined
    try {
      const result = await instance.acquireTokenSilent({
        ...acquireRequest(activeAccount),
        account: activeAccount,
        forceRefresh: true
      })
      setToken(result.idToken)
      return result.idToken
    } catch {
      setToken(undefined)
      return undefined
    }
  }

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    isLoading: !isReady && !MOCK_AUTH,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}