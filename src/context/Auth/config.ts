import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        authority: import.meta.env.VITE_AUTH_AUTHORITY,
        redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI,
        postLogoutRedirectUri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
        navigateToLoginRequestUrl: true,
        allowRedirectInIframe: true
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) return
                switch (level) {
                    case LogLevel.Error:
                        console.error(message)
                        return
                    case LogLevel.Verbose:
                        console.debug(message)
                        return
                    case LogLevel.Warning:
                        console.warn(message)
                        return
                    default:
                        return
                }
            }
        }
    }
}

export const acquireRequest = (account: any) => ({
    scopes: ["openid", "profile", "email", `api://${ import.meta.env.VITE_ENTRA_CLIENT_ID }/.default`],
    account,
    redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI
})