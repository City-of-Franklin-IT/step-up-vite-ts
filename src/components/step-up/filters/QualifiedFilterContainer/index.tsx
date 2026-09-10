import { useHandleQualifiedFilter } from './hooks'

// Types
import * as AppTypes from '@/context/App/AppTypes'

const OPTIONS: AppTypes.RankType[] = ['Engineer', 'Lieutenant', 'Captain', 'BC']

function QualifiedFilterContainer() {
  const { value, onChange } = useHandleQualifiedFilter()

  return (
    <label className="flex-1 flex flex-col gap-2">
      <span className="font-[jura] uppercase text-base text-neutral-content/90">Filter Qualified</span>
      <select className="select w-full" value={value} onChange={onChange}>
        <option value="">All</option>
        {OPTIONS.map(option => (
          <option key={`qualified-filter-${ option }`} value={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

export default QualifiedFilterContainer
