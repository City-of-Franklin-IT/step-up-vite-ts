import { render, screen, fireEvent } from "@testing-library/react"
import SkillsBtn from "../index"

describe("SkillsBtn", () => {
  it("renders the children label", () => {
    render(<SkillsBtn btnProps={{ onClick: vi.fn() }}>Paramedic</SkillsBtn>)
    expect(screen.getByText("Paramedic")).toBeInTheDocument()
  })

  it("calls onClick when clicked", () => {
    const onClick = vi.fn()
    render(<SkillsBtn btnProps={{ onClick }}>Paramedic</SkillsBtn>)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
