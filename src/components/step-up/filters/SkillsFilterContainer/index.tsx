import { useHandleSkillsFilter } from './hooks'

function SkillsFilterContainer({ skills }: { skills: string[] }) {
  const { value, onChange } = useHandleSkillsFilter()

  return (
    <label className="flex-1 flex flex-col gap-2">
      <span className="font-[jura] uppercase text-base text-neutral-content/90">Filter <small className="italic">by</small> Skill</span>
      <select className="select w-full" value={value} onChange={onChange}>
        <option value="">All</option>
        {skills.map(skill => (
          <option key={`skills-filter-${ skill }`} value={skill}>{skill}</option>
        ))}
      </select>
    </label>
  )
}

export default SkillsFilterContainer
