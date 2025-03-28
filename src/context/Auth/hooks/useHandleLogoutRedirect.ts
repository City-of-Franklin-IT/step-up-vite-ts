import { useMsal } from "@azure/msal-react"

export default () => {
  const { instance, accounts } = useMsal()

  return () => {
    instance
      .logoutRedirect({
        account: accounts[0],
        postLogoutRedirectUri: '/step-up/login',
      })
  }
}