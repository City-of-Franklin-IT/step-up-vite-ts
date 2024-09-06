import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Error.module.css'

// Types
import { ErrorProps, ErrorState } from './types'

function Error({ title, subtitle }: ErrorProps) {
  const [state, setState] = useState<ErrorState>({ countdown: 5 })

  const navigate = useNavigate()

  const redirect = useCallback(() => {
    if(state.countdown === 0) {
      navigate('/home')
    }
  }, [state.countdown])

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prevState => ({ countdown: prevState.countdown - 1 }))
    }, 1000)

    redirect()

    return () => clearInterval(interval)
  }, [redirect])

  return (
    <div data-testid="error" className={styles.container}>
      <div className="flex flex-col gap-3 items-center h-full">
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.subTitle}>{subtitle} in <span className={styles.counter}>{state.countdown}</span> seconds</div>
      </div>
    </div>
  )
}

export default Error