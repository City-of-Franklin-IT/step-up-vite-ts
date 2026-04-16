import { render, screen } from "@testing-library/react"
import HandleLoading from "../index"

describe("HandleLoading", () => {
  it("renders the Loading spinner when isLoading is true", () => {
    render(<HandleLoading isLoading={true}><div>content</div></HandleLoading>)
    expect(screen.getByAltText("loading icon")).toBeInTheDocument()
    expect(screen.queryByText("content")).not.toBeInTheDocument()
  })

  it("renders children when isLoading is false", () => {
    render(<HandleLoading isLoading={false}><div>content</div></HandleLoading>)
    expect(screen.getByText("content")).toBeInTheDocument()
    expect(screen.queryByAltText("loading icon")).not.toBeInTheDocument()
  })
})
