import { handleTime } from "../../../helpers/utils"
import styles from './SchedulesTable.module.css'

// Types
import { Schedule } from "../../../context/App/types"

export const NoRecentShifts = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  return (
    <div data-testid="no-recent-shifts" className="text-center italic my-auto">No Recent Step-Up Shifts</div>
  )
}

export const Table = ({ visible, schedules, employeeId }: { visible: boolean, schedules: Schedule[], employeeId: string }) => {
  if(!visible) return null

  return (
    <table data-testid="schedules-table" className={styles.schedulesTable}>
      <Headers />
      <TableBody
        schedules={schedules}
        employeeId={employeeId} />
    </table>
  )
}

const Headers = () => {

  return (
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
  )
}

const TableBody = ({ schedules, employeeId }: { schedules: Schedule[], employeeId: string }) => {

  return (
    <tbody>
      {schedules.map(schedule => {
            return (
              <TableRow
                key={`schedules-table-row-${ employeeId }-${ schedule.startDate }`} 
                schedule={schedule} />
            )
          })}
    </tbody>
  )
}

const TableRow = ({ schedule }: { schedule: Schedule }) => {

  return (
    <tr className={styles.tableData}>
      <td>{schedule.startDate.toString()}</td>
      <td>{handleTime(schedule.startTime)}</td>
      <td>{schedule.endDate.toString()}</td>
      <td>{handleTime(schedule.endTime)}</td>
      <td>{schedule.hours}</td>
      <td>{schedule.detailCode}</td>
    </tr>
  )
}