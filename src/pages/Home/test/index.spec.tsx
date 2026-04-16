import { render, screen } from "@testing-library/react"
import Home from "../index"

const mockUseGetStaff = vi.fn()

vi.mock("../hooks", () => ({
  useGetStaff: () => mockUseGetStaff()
}))

vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
}))

vi.mock("@/utils/ErrorBoundary", () => ({
  default: ({ children }: { children: React.ReactElement }) => <>{children}</>
}))

vi.mock("@/components/step-up/containers/TableContainer", () => ({
  default: ({ staff }: { staff: unknown[] | undefined }) => (
    <div data-testid="table-container">{ staff?.length ?? 0 } employees</div>
  )
}))

describe("Home", () => {
  it("renders the loading spinner while data is loading", () => {
    mockUseGetStaff.mockReturnValue({ data: undefined, isLoading: true })
    render(<Home />)
    expect(screen.getByAltText("loading icon")).toBeInTheDocument()
    expect(screen.queryByTestId("table-container")).not.toBeInTheDocument()
  })

  it("renders TableContainer when data has loaded", () => {
    mockUseGetStaff.mockReturnValue({ data: { data: [] }, isLoading: false })
    render(<Home />)
    expect(screen.getByTestId("table-container")).toBeInTheDocument()
    expect(screen.queryByAltText("loading icon")).not.toBeInTheDocument()
  })
})
