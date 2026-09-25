import { render, screen, fireEvent } from "@testing-library/react"
import ShiftBtn from "../index"

describe("ShiftBtn", () => {
  it("renders the children label", () => {
    render(<ShiftBtn btnProps={{ onClick: vi.fn() }}>A Shift</ShiftBtn>)
    expect(screen.getByText("A Shift")).toBeInTheDocument()
  })

  it("calls onClick when clicked", () => {
    const onClick = vi.fn()
    render(<ShiftBtn btnProps={{ onClick }}>B</ShiftBtn>)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
