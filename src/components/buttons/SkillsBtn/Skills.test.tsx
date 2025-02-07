import { fireEvent, render } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"
import AppContext from "../../../context/App/AppContext"

// Types
import { AppContextObj } from "../../../context/App/types"
import { SkillsBtnProps } from "./types"

// Components
import SkillsBtn from "."

describe('SkillsBtn component', () => {
  const defaultProps: SkillsBtnProps = {
    label: 'Driver',
    type: 'Driver'
  }

  const dispatchMock = vi.fn()

  const ctx: AppContextObj = { // Context state
    dispatch: dispatchMock,
    date: '2024-08-05',
    filter: '',
    searchValue: '',
    shiftFilter: null,
    showAllStaff: false,
    skillsFilter: ''
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<SkillsBtn { ...defaultProps } />)
    const button = getByTestId('skills-btn')

    expect(button).toBeInTheDocument()
  })

  test('Reducer function dispatched on button click', () => {
    const { getByTestId } = render(
      <AppContext.Provider value={ctx}>
        <SkillsBtn { ...defaultProps } />
      </AppContext.Provider>
    )

    const button = getByTestId('skills-btn')

    fireEvent.click(button)

    expect(ctx.dispatch).toHaveBeenCalledWith({ type: 'SET_SKILLS_FILTER', payload: defaultProps.type })
  })
  
  test('Component label rendered correctly', () => {
    const { getByText } = render(<SkillsBtn { ...defaultProps } />)
    const text = getByText(defaultProps.label)

    expect(text).toBeInTheDocument()
  })
})