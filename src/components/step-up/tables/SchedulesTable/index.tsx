// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import * as Components from './components'

function SchedulesTable({ schedules, employeeId }: { schedules: AppTypes.ScheduleInterface[], employeeId: string }) {
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
