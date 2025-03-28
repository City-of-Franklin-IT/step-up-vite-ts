import styles from './Table.module.css'

// Types
import { TableProps } from './types'

// Components
import * as Components from './components'

function Table({ employees }: TableProps) {

  return (
    <div data-testid="table" className={styles.container}>
      <table>
        <Components.Headers />
        <Components.TableBody employees={employees} />
      </table>
    </div>
  )
}

export default Table