// Components
import QualifiedFilterContainer from '../QualifiedFilterContainer'
import ShiftFilterContainer from '../ShiftFilter'
import SkillsFilterContainer from '../SkillsFilterContainer'

function FiltersContainer({ skills }: { skills: string[] }) {

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-8">
      <QualifiedFilterContainer />
      <ShiftFilterContainer />
      <SkillsFilterContainer skills={skills} />
    </div>
  )
}

export default FiltersContainer