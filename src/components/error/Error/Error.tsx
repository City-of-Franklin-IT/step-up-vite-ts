import { useHandleRedirect } from '.'
import styles from './Error.module.css'

// Types
import { ErrorProps } from './types'

function Error({ title, subtitle }: ErrorProps) {
  const { state } = useHandleRedirect()

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