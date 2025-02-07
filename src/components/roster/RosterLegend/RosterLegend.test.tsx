import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

// Components
import RosterLegend from '.'

describe('RosterLegend component', () => {
  test('Component renders correctly', () => {
    const { getByTestId } = render(<RosterLegend />)
    const component = getByTestId('roster-legend')

    expect(component).toBeInTheDocument()
  })
})