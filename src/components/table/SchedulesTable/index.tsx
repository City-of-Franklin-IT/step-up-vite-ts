import styles from './SchedulesTable.module.css'

// Types
import { SchedulesTableProps } from './types'

// Components
import { NoRecentShifts, TableBody } from './components'

function SchedulesTable({ schedules, employeeId }: SchedulesTableProps) {
  const noRecentShifts = !schedules.length ? true : false

  return (
    <>
      <NoRecentShifts noRecentShifts={noRecentShifts} />
      <table data-testid="schedules-table" className={!noRecentShifts ? styles.schedulesTable : 'hidden'}>

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

        <TableBody 
          schedules={schedules}
          employeeId={employeeId} />

      </table>
    </>
    
  )
}

export default SchedulesTable
