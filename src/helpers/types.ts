// Types
import { Dispatch } from "react"
import { UserAction } from "../context/User/types"

export interface UseValidateUserProps { // useValidateUser hook props
  dispatch: Dispatch<UserAction>
}

export interface HandleTimeProps { // handleTime fn props
  time: string
}