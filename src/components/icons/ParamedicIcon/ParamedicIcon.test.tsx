import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

// Types
import { ParamedicIconProps } from "./types"

// Components
import ParamedicIcon from "./ParamedicIcon"

describe('ParamedicIcon component', () => {
  const defaultProps: ParamedicIconProps = {
    width: 20,
    height: 20
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<ParamedicIcon { ...defaultProps } />)
    const icon = getByTestId('paramedic-icon')

    expect(icon).toBeInTheDocument()
  })
})