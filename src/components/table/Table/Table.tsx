import styles from './Table.module.css'

// Types
import { TableProps } from './types'

// Components
import { TableRow } from '.'

function Table({ data }: TableProps) {
  return (
    <div data-testid="table" className={styles.container}>
      <table>

        <thead>
          <tr className={styles.header}>
            <th className="px-4">Employee</th>
            <th className="text-center rounded-tr-lg whitespace-nowrap lg:rounded-none md:transform md:-translate-x-10">Step-Up HRs.</th>
            <th className="text-center hidden lg:block">Recent Step Up Shifts</th>
          </tr>
        </thead>

        <tbody>
          {data.map((obj, index) => {
            return (
              <TableRow
                employee={obj}
                index={index} />
            )
          })}
        </tbody>
        
      </table>
    </div>
  )
}

export default Table
