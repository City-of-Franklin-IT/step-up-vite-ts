import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

// Components
import Footer from "./Footer"

describe('Footer component', () => {
  test('Component renders correctly', () => {
    const { getByTestId } = render(<Footer />)
    const component = getByTestId('footer')

    expect(component).toBeInTheDocument()
  })
})