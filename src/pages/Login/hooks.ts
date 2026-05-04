import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth, MOCK_AUTH } from '@/context/Auth'

export const useHandleAuth = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(MOCK_AUTH) {
      navigate('/home')
      return
    }

    if(!isLoading && isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, isLoading, navigate])
}