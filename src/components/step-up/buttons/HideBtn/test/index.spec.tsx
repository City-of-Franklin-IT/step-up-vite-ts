import { render, screen, fireEvent } from "@testing-library/react"
import HideBtn from "../index"

describe("HideBtn", () => {
  it("switches icon src when hidden prop changes", () => {
    const { rerender } = render(<HideBtn onClick={vi.fn()} hidden={false} />)
    const srcWhenVisible = screen.getByAltText("hiden btn icon").getAttribute("src")

    rerender(<HideBtn onClick={vi.fn()} hidden={true} />)
    const srcWhenHidden = screen.getByAltText("hiden btn icon").getAttribute("src")

    expect(srcWhenVisible).not.toBe(srcWhenHidden)
  })

  it("calls onClick handler when clicked", () => {
    const onClick = vi.fn()
    render(<HideBtn onClick={onClick} hidden={false} />)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
