import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: '9c8d1241-f162-4ff1-b131-7fa92957377b',
        authority: 'https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/',
        redirectUri: 'https://istest.franklintn.gov/step-up/login',
        postLogoutRedirectUri: '/login',
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: [],
};