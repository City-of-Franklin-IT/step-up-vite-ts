import styles from './Table.module.css'

// Types
import { TableDataType } from './utils'

// Components
import * as Components from './components'

function Table({ employees }: { employees: TableDataType[] }) {

  return (
    <div className={styles.container}>
      <table>
        <Components.Headers />
        <Components.TableBody employees={employees} />
      </table>
    </div>
  )
}

export default Table