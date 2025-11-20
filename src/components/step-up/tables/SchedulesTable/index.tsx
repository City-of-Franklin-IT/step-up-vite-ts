// Types
import { ScheduleInterface } from '../../../../context/App/types'

// Components
import * as Components from './components'

function SchedulesTable({ schedules, employeeId }: { schedules: ScheduleInterface[], employeeId: string }) {
  const noRecentShifts = !schedules.length

  return (
    <>
      <Components.NoRecentShifts visible={noRecentShifts} />
      <Components.Table
        visible={!noRecentShifts}
        tableBodyProps={{
          schedules,
          employeeId
        }} />
    </>
  )
}

export default SchedulesTable
