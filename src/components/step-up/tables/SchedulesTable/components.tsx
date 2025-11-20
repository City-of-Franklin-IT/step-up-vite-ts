import { handleTime } from "../../../../helpers/utils"
import styles from './SchedulesTable.module.css'

// Types
import { ScheduleInterface } from "../../../../context/App/types"

export const NoRecentShifts = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  return (
    <div data-testid="no-recent-shifts" className="text-center italic my-auto">No Recent Step-Up Shifts</div>
  )
}

type TableProps = { visible: boolean, tableBodyProps: { schedules: ScheduleInterface[], employeeId: string } }

export const Table = (props: TableProps) => {
  if(!props.visible) return null

  return (
    <table data-testid="schedules-table" className={styles.schedulesTable}>
      <Headers />
      <TableBody { ...props.tableBodyProps } />
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

type TableBodyProps = { schedules: ScheduleInterface[], employeeId: string }

const TableBody = (props: TableBodyProps) => {

  return (
    <tbody>
      {props.schedules.map((schedule, index) => {
        return (
          <TableRow
            key={`schedules-table-row-${ props.employeeId }-${ schedule.startDate }-${ schedule.endDate }-${ index }`} 
            schedule={schedule} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ schedule }: { schedule: ScheduleInterface }) => {

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