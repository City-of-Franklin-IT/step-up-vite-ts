import { useNavigate } from "react-router-dom"
import { validateToken } from "../context/User/UserActions"

// Types
import { useState, useEffect } from "react"
import { ValidateTokenResponse } from "../context/User/types"
import { UseValidateUserProps, HandleTimeProps } from "./types"

export const useValidateUser = (dispatch: UseValidateUserProps['dispatch']) => { // Validate user
  const navigate = useNavigate()

  useEffect(() => {
    validateUser()
      .then(response => {
        if(response.success) {
          dispatch({ type: 'SET_USER', payload: response.data })
        } else {
          dispatch({ type: 'SET_USER', payload: undefined })
          navigate('/login')
        }
      })
  }, [dispatch, navigate])
}

const validateUser = async (): Promise<ValidateTokenResponse> => {
  const result = await validateToken()

  return result
}

export const useGetWindowSize = (): boolean => { // Get window size
  const [state, setState] = useState<{ width: number }>({ width: window.innerWidth })

  useEffect(() => {
    const handleResize = () => setState({ width: window.innerWidth })

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return state.width < 1025
}

export const handleTime = (time: HandleTimeProps['time']): string => { // Format and return time
  return time.split("T")[1].replace("Z", '').split('.')[0].slice(0, 5)
}