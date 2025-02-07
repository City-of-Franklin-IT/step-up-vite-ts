import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

// Types
import { CalendarIconProps } from "./types"

// Components
import CalendarIcon from "."

describe('CalendarIcon component', () => {
  const defaultProps: CalendarIconProps = {
    height: 20,
    width: 20
  }

  test('Component rendered correctly', () => {
    const { getByTestId } = render(<CalendarIcon { ...defaultProps } />)
    const icon = getByTestId('calendar-icon')

    expect(icon).toBeInTheDocument()
  })
})