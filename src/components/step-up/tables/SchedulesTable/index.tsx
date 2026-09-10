// Types
import * as AppTypes from '@/context/App/AppTypes'
import type { ScheduleColorVariant } from './components'

// Components
import * as Components from './components'

function SchedulesTable({ schedules, employeeId, emptyMessage, testIdPrefix, colorVariant }: { schedules: AppTypes.ScheduleInterface[], employeeId: string, emptyMessage: string, testIdPrefix: string, colorVariant: ScheduleColorVariant }) {
  const noShifts = !schedules.length

  return (
    <>
      <Components.EmptyState
        visible={noShifts}
        message={emptyMessage}
        testIdPrefix={testIdPrefix} />
      <Components.Table
        visible={!noShifts}
        testIdPrefix={testIdPrefix}
        colorVariant={colorVariant}
        tableBodyProps={{
          schedules,
          employeeId,
          colorVariant
        }} />
    </>
  )
}

export default SchedulesTable
