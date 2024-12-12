import styles from './SchedulesTable.module.css'

// Types
import { SchedulesTableProps } from './types'

// Components
import { TableRow } from '.'

function SchedulesTable({ data, employeeId }: SchedulesTableProps) {
  if(!data.length) {
    return (
      <div data-testid="no-recent-shifts" className="text-center italic my-auto">No Recent Step-Up Shifts</div>
    )
  }

  return (
    <table data-testid="schedules-table" className={styles.schedulesTable}>

      <thead>
        <tr>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>End Date</th>
          <th>End Time</th>
          <th>Hours</th>
          <th>Detail Code</th>
        </tr>
      </thead>

      <tbody>
        {data.map((obj, index) => {
          return (
            <TableRow
              key={`schedules-table-row-${ employeeId }-${ index }`} 
              schedule={obj} />
          )
        })}
      </tbody>
      
    </table>
  )
}

export default SchedulesTable
