import { handleTime } from "@/helpers/utils"
import styles from './SchedulesTable.module.css'

// Types
import * as AppTypes from '@/context/App/AppTypes'

export type ScheduleColorVariant = "info" | "success" | "warning"

const colorClassNames: Record<ScheduleColorVariant, { header: string, border: string }> = {
  info: { header: 'bg-info text-info-content', border: 'border-info' },
  success: { header: 'bg-success text-success-content', border: 'border-success' },
  warning: { header: 'bg-warning text-warning-content', border: 'border-warning' }
}

export const EmptyState = ({ visible, message, testIdPrefix }: { visible: boolean, message: string, testIdPrefix: string }) => {
  if(!visible) return null

  return (
    <div data-testid={`no-${ testIdPrefix }-shifts`} className="text-center italic my-auto">{message}</div>
  )
}

type TableProps = { visible: boolean, testIdPrefix: string, colorVariant: ScheduleColorVariant, tableBodyProps: { schedules: AppTypes.ScheduleInterface[], employeeId: string, colorVariant: ScheduleColorVariant } }

export const Table = (props: TableProps) => {
  if(!props.visible) return null

  return (
    <table data-testid={`${ props.testIdPrefix }-schedules-table`} className={styles.schedulesTable}>
      <Headers colorVariant={props.colorVariant} />
      <TableBody { ...props.tableBodyProps } />
    </table>
  )
}

const Headers = ({ colorVariant }: { colorVariant: ScheduleColorVariant }) => {
  return (
    <thead>
      <tr className={colorClassNames[colorVariant].header}>
        <th className="whitespace-nowrap">Start Date</th>
        <th className="whitespace-nowrap">Start Time</th>
        <th className="whitespace-nowrap">End Date</th>
        <th className="whitespace-nowrap">End Time</th>
        <th className="whitespace-nowrap">Hours</th>
        <th className="whitespace-nowrap">Detail Code</th>
      </tr>
    </thead>
  )
}

type TableBodyProps = { schedules: AppTypes.ScheduleInterface[], employeeId: string, colorVariant: ScheduleColorVariant }

const TableBody = (props: TableBodyProps) => {

  return (
    <tbody>
      {props.schedules.map((schedule, index) => {
        return (
          <TableRow
            key={`schedules-table-row-${ props.employeeId }-${ schedule.startDate }-${ schedule.endDate }-${ index }`}
            schedule={schedule}
            colorVariant={props.colorVariant} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ schedule, colorVariant }: { schedule: AppTypes.ScheduleInterface, colorVariant: ScheduleColorVariant }) => {
  const borderClassName = `border-b ${ colorClassNames[colorVariant].border }`

  return (
    <tr className={`${ styles.tableData } ${ borderClassName }`}>
      <td>{schedule.startDate.toString()}</td>
      <td>{handleTime(schedule.startTime)}</td>
      <td>{schedule.endDate.toString()}</td>
      <td>{handleTime(schedule.endTime)}</td>
      <td>{schedule.hours}</td>
      <td>{schedule.detailCode}</td>
    </tr>
  )
}