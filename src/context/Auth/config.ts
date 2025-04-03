import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: 'beec6da4-ba46-45c7-9630-ddb7df68b3da',
        authority: 'https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/',
        redirectUri: 'https://dev.franklintn.gov/step-up',
        postLogoutRedirectUri: '/',
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
    scopes: ["openid", "profile"],
    redirectUri: "https://dev.franklintn.gov/step-up"
};