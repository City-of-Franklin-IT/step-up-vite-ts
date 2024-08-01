import { handleTime } from '../../../helpers'
import styles from './SchedulesTable.module.css'

// Types
import { SchedulesTableProps } from './types'

function SchedulesTable({ data }: SchedulesTableProps) {
  if(!data.length) {
    return (
      <div className="text-center italic">No Recent Step-Up Shifts</div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.header}>Start Date</th>
          <th className={styles.header}>Start Time</th>
          <th className={styles.header}>End Date</th>
          <th className={styles.header}>End Time</th>
          <th className={styles.header}>Hours</th>
          <th className={styles.header}>Detail Code</th>
        </tr>
      </thead>
      <tbody>
        {data.map((obj, index) => {
          return (
            <tr key={`${ index }`} className={styles.tableData}>
              <td>{obj.startDate.toString()}</td>
              <td>{handleTime(obj.startTime)}</td>
              <td>{obj.endDate.toString()}</td>
              <td>{handleTime(obj.endTime)}</td>
              <td>{obj.hours}</td>
              <td>{obj.detailCode}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default SchedulesTable
