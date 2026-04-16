import { render, screen, fireEvent } from "@testing-library/react"
import BackToTopBtn from "../index"

describe("BackToTopBtn", () => {
  it("renders the button label", () => {
    render(<BackToTopBtn onClick={vi.fn()} />)
    expect(screen.getByTestId("back-to-top-btn")).toBeInTheDocument()
    expect(screen.getByText("Back To Top")).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", () => {
    const onClick = vi.fn()
    render(<BackToTopBtn onClick={onClick} />)
    fireEvent.click(screen.getByTestId("back-to-top-btn"))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
