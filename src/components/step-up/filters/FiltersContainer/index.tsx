// Components
import QualifiedFilterContainer from '../QualifiedFilterContainer'
import ShiftFilterContainer from '../ShiftFilter'
import SkillsFilterContainer from '../SkillsFilterContainer'

function FiltersContainer({ skills }: { skills: string[] }) {
  
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