export interface SkillsFilterContainerProps { // SkillsFilterContainer props
  skills: string[],
  handleResetSearchBtn: () => void
}

export interface SkillsFilterContainerState { // SkillsFilterContainer state object
  hidden: boolean
}