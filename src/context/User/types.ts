// Types
import { Dispatch } from "react"
import { ServerResponse } from "../App/types"

export interface LoginForm { // LoginForm props
  email: string,
  password: string
}

export interface ValidateTokenResponse extends ServerResponse { // validateToken response object
  data: User
}

export interface UserContextObj { // UserContext
  dispatch: Dispatch<UserAction>
  user: User | undefined
}

export interface UserState { // UserContext initial state obj
  user: User| undefined
}

export interface UserReducerProps { // UserReducer props
  state: UserState
  action: UserAction
}

export type UserAction =
  | { type: 'SET_USER', payload: { email: string, role: Role | undefined, department: string } | undefined }

export interface User {
  email: string
  role: Role | undefined
  department: string
}

export type Role =
  | "Super User"
  | "Viewer"