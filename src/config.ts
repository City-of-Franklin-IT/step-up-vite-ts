export const NODE_ENV = import.meta.env.DEV ? "development" : "production"

export const APP_BASE = "/step-up"
export const APP_TITLE = "FFD Step Up Pay & Rosters"

export const CLIENT_ID = "beec6da4-ba46-45c7-9630-ddb7df68b3da"
export const ENTRA_CLIENT_ID = "0eafaf46-280e-490f-9015-bd9cc07e224e"

export const AUTH_AUTHORITY = "https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f"
export const AUTH_REDIRECT_URI = "https://fireapps.franklintn.gov/step-up"
export const AUTH_POST_LOGOUT_REDIRECT_URI = "https://fireapps.franklintn.gov/"

export const MOCK_TOKEN = "dev-token-12345"

export const API_URL = NODE_ENV === "development" ?
  "https://cofasv38.franklin-gov.com/api/v3/ffd/step-up" :
  "https://fireapps.franklintn.gov/api/v3/ffd/step-up"
