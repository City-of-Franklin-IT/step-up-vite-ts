import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// Types
import { ErrorState } from './types'

export const useHandleRedirect = () => { // Redirect user home
  const [state, setState] = useState<ErrorState>({
    countdown: 5
  })

  const navigate = useNavigate()

  const redirect = useCallback(() => {
    if(state.countdown === 0) {
      navigate('/home')
    }
  }, [state.countdown, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prevState => ({ countdown: prevState.countdown - 1 }))
    }, 1000)

    redirect()

    return () => clearInterval(interval)
  }, [redirect])

  return { state }
}