import { render, screen } from "@testing-library/react"
import Loading from "../index"

describe("Loading", () => {
  it("renders the loading image", () => {
    render(<Loading />)
    expect(screen.getByAltText("loading icon")).toBeInTheDocument()
  })
})
