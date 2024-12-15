import { handleTime } from "../../../helpers"
import styles from './SchedulesTable.module.css'

// Types
import { ReactElement } from "react"
import { Schedule } from "../../../context/App/types"
import { TableRowProps } from "./types"

export const NoRecentShifts = ({ noRecentShifts }: { noRecentShifts: boolean }) => {

  if(noRecentShifts) {
    return (
      <div data-testid="no-recent-shifts" className="text-center italic my-auto">No Recent Step-Up Shifts</div>
    )
  }
}

export const TableBody = ({ schedules, employeeId }: { schedules: Schedule[], employeeId: string }) => {

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

const TableRow = ({ schedule }: TableRowProps): ReactElement => {

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