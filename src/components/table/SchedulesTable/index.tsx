// Types
import { Schedule } from '../../../context/App/types'

// Components
import * as Components from './components'

function SchedulesTable({ schedules, employeeId }: { schedules: Schedule[], employeeId: string }) {
  const noRecentShifts = !schedules.length

  return (
    <>
      <Components.NoRecentShifts visible={noRecentShifts} />
      <Components.Table
        visible={!noRecentShifts}
        schedules={schedules}
        employeeId={employeeId} />
    </>
  )
}

export default SchedulesTable
