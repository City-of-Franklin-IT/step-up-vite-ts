import { useHandleShiftFilter } from './hooks'

// Types
import * as AppTypes from '@/context/App/AppTypes'

const OPTIONS: AppTypes.ShiftType[] = ['A', 'B', 'C']

function ShiftFilterContainer() {
  const { value, onChange } = useHandleShiftFilter()

  return (
    <label className="flex-1 flex flex-col gap-2">
      <span className="font-[jura] uppercase text-base text-neutral-content/90">Filter <small className="italic">by</small> Shift</span>
      <select className="select w-full" value={value} onChange={onChange}>
        <option value="">All</option>
        {OPTIONS.map(option => (
          <option key={`shift-filter-${ option }`} value={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

export default ShiftFilterContainer
