import { render } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"
import AppContext from "../../../../context/App/AppContext"

// Types
import { AppContextObj } from "../../../../context/App/types"
import { SkillsFilterContainerProps } from "./types"
import SkillsFilterContainer from "./SkillsFilterContainer"

describe('SkillsFilterContainer component', () => {
  const handleResetSearchBtnMock = vi.fn()
  const dispatchMock = vi.fn()

  const defaultProps: SkillsFilterContainerProps = {
    skills: ['Driver', 'AEMT', 'Tech Rescue'],
    handleResetSearchBtn: handleResetSearchBtnMock
  }

  const ctx: AppContextObj = {
    dispatch: dispatchMock,
    date: '',
    filter: '',
    searchValue: 'Southern',
    shiftFilter: null,
    showAllStaff: false,
    skillsFilter: 'Driver'    
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<SkillsFilterContainer { ...defaultProps } />)
    const component = getByTestId('skills-filter-container')

    expect(component).toBeInTheDocument()
  })

  test('Conditionally renders children correctly', () => {
    const { getByText, queryByText, unmount } = render(
      <AppContext.Provider value={ctx}>
        <SkillsFilterContainer { ...defaultProps } />
      </AppContext.Provider>
    )
    const component = getByText('Remove Filter')

    expect(component).toBeInTheDocument() // Remove Filter button should render

    unmount()

    render(
      <AppContext.Provider value={{ ...ctx, skillsFilter: '' }}>
        <SkillsFilterContainer { ...defaultProps } />
      </AppContext.Provider>
    )

    expect(queryByText('Remove Filter')).not.toBeInTheDocument() // Remove Filter button should not render when skillsFilter = ''
  })

  test('Component renders children correctly', () => {
    const { getAllByTestId } = render(
      <AppContext.Provider value={{ ...ctx, skillsFilter: '' }}>
        <SkillsFilterContainer { ...defaultProps } />
      </AppContext.Provider>
    )
    const components = getAllByTestId('skills-btn')

    expect(components.length).toBe(defaultProps.skills.length) // Component should render the same amount of SkillsBtns as there are items in defaultProps.skills[]
  })

  test('Component renders label correctly', () => {
    const { getByText, queryByTestId, unmount } = render(
      <AppContext.Provider value={{ ...ctx, skillsFilter: 'Driver' }}>
        <SkillsFilterContainer { ...defaultProps } />
      </AppContext.Provider>
    )
    const component = getByText(`Showing ${ ctx.skillsFilter }`)

    expect(component).toBeInTheDocument()

    unmount()

    render(
      <AppContext.Provider value={{ ...ctx, skillsFilter: '' }}>
        <SkillsFilterContainer { ...defaultProps } />
      </AppContext.Provider>
    )

    expect(queryByTestId('skills-filter-container-label')).not.toBeInTheDocument() // Label should not render when skillsFilter = ''
  })
})