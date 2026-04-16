import { render } from "@testing-library/react"
import Redirect from "../index"

const mockUseRedirect = vi.fn()

vi.mock("../hooks", () => ({
  useRedirect: () => mockUseRedirect()
}))

describe("Redirect", () => {
  it("renders nothing to the DOM", () => {
    mockUseRedirect.mockReturnValue(undefined)
    const { container } = render(<Redirect />)
    expect(container).toBeEmptyDOMElement()
  })

  it("calls useRedirect on render", () => {
    mockUseRedirect.mockReturnValue(undefined)
    render(<Redirect />)
    expect(mockUseRedirect).toHaveBeenCalled()
  })
})
