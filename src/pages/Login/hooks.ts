import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/Auth'

export const useHandleAuth = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(import.meta.env.DEV) {
      navigate('/home')
      return
    }

    if(!isLoading && isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, isLoading, navigate])
}