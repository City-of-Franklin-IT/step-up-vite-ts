import { render, screen } from "@testing-library/react"
import Rosters from "../index"

const mockUseGetRoster = vi.fn()

vi.mock("../hooks", () => ({
  useGetRoster: () => mockUseGetRoster()
}))

vi.mock("@/helpers/hooks", () => ({
  useRedirectAfterLogin: vi.fn()
}))

vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
}))

vi.mock("@/utils/ErrorBoundary", () => ({
  default: ({ children }: { children: React.ReactElement }) => <>{children}</>
}))

vi.mock("@/components/roster/containers/RosterContainer", () => ({
  default: ({ rosters }: { rosters: unknown[] | undefined }) => (
    <div data-testid="roster-container">{ rosters?.length ?? 0 } entries</div>
  )
}))

describe("Rosters", () => {
  it("renders the loading spinner while data is loading", () => {
    mockUseGetRoster.mockReturnValue({ data: undefined, isLoading: true })
    render(<Rosters />)
    expect(screen.getByAltText("loading icon")).toBeInTheDocument()
    expect(screen.queryByTestId("roster-container")).not.toBeInTheDocument()
  })

  it("renders RosterContainer when data has loaded", () => {
    mockUseGetRoster.mockReturnValue({ data: { data: [] }, isLoading: false })
    render(<Rosters />)
    expect(screen.getByTestId("roster-container")).toBeInTheDocument()
    expect(screen.queryByAltText("loading icon")).not.toBeInTheDocument()
  })
})
