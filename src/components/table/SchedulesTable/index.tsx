import { handleTime } from "../../../helpers"
import styles from './SchedulesTable.module.css'

// Types
import { ReactElement } from "react"
import { TableRowProps } from "./types"

export const TableRow = ({ schedule, index }: TableRowProps): ReactElement => {

  return (
    <tr key={`schedule-table-row-${ index }`} className={styles.tableData}>
      <td>{schedule.startDate.toString()}</td>
      <td>{handleTime(schedule.startTime)}</td>
      <td>{schedule.endDate.toString()}</td>
      <td>{handleTime(schedule.endTime)}</td>
      <td>{schedule.hours}</td>
      <td>{schedule.detailCode}</td>
    </tr>
  )
}