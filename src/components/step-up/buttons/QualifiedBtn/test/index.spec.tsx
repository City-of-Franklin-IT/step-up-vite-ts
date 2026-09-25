import { render, screen, fireEvent } from "@testing-library/react"
import QualifiedBtn from "../index"

describe("QualifiedBtn", () => {
  it("renders the children label", () => {
    render(<QualifiedBtn btnProps={{ onClick: vi.fn() }}>Engineer</QualifiedBtn>)
    expect(screen.getByText("Engineer")).toBeInTheDocument()
  })

  it("calls onClick when clicked", () => {
    const onClick = vi.fn()
    render(<QualifiedBtn btnProps={{ onClick }}>Engineer</QualifiedBtn>)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
