import { useNavigate } from 'react-router'
import { APP_BASE } from '@/config'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function ErrorBoundary({ children }: { children: React.ReactElement }) {
  const ErrorFallback = () => {
    const navigate = useNavigate()

    setTimeout(() => { // Navigate to href after 50ms
      const href = APP_BASE

      navigate(href)
    }, (50))

    return null
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset any state or perform any action on reset
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary