import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../config";

export default () => {
  const { instance } = useMsal()

  return () => {
    instance
    .loginRedirect({
        ...loginRequest,
        prompt: 'create',
    })
    .catch((error) => console.log(error))
  }
}