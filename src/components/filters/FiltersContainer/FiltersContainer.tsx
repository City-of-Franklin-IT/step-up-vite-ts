// Types
import { FiltersContainerProps } from './types'

// Components
import QualifiedFilterContainer from '../qualified/QualifiedFilterContainer/QualifiedFilterContainer'
import ShiftFilterContainer from '../shift/ShiftFilterContainer'
import SkillsFilterContainer from '../skills/SkillsFilterContainer/SkillsFilterContainer'

function FiltersContainer({ skills }: FiltersContainerProps) {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex gap-14 justify-between flex-wrap">
        <QualifiedFilterContainer />
        <ShiftFilterContainer />
      </div>
      <SkillsFilterContainer skills={skills} />
    </div>
  )
}

export default FiltersContainer