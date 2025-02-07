import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

// Types
import { LoadingIconProps } from "./types"

// Components
import LoadingIcon from "."

describe('Loading component', () => {
  const defaultProps: LoadingIconProps = {
    width: 20,
    height: 20
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<LoadingIcon { ...defaultProps } />)
    const component = getByTestId('loading-icon')

    expect(component).toBeInTheDocument()
  })
})