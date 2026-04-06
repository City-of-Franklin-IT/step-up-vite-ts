import { PublicClientApplication, EventType, AuthenticationResult } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { useEffect, useState } from "react"
import { NODE_ENV } from "@/config"
import { msalConfig } from "../config"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)
  const [isInitialized, setIsInitialized] = useState(NODE_ENV === 'development')

  useEffect(() => {
    if (NODE_ENV === 'development') return

    const initializeMsal = async () => {
      const instance = new PublicClientApplication(msalConfig)
      await instance.initialize()

      // Promote first account if no active account exists
      const accounts = instance.getAllAccounts()
      if (!instance.getActiveAccount() && accounts.length > 0) {
        instance.setActiveAccount(accounts[0])
      }

      // Listen for successful login events
      instance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
          const authResult = event.payload as AuthenticationResult
          if (authResult?.account) {
            instance.setActiveAccount(authResult.account)
          }
        }
      })

      setMsalInstance(instance)
      setIsInitialized(true)
    }

    initializeMsal()
  }, [])

  if(!isInitialized || !msalInstance) {
    return <div>Initializing authentication...</div>
  }

  if(NODE_ENV === 'development') {
    return <>{children}</>
  }

  return (
    <MsalProvider instance={msalInstance!}>
      {children}
    </MsalProvider>
  )
}