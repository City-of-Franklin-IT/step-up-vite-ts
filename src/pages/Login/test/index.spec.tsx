import { render } from "@testing-library/react"
import Login from "../index"

const mockUseHandleAuth = vi.fn()

vi.mock("../hooks", () => ({
  useHandleAuth: () => mockUseHandleAuth()
}))

vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe("Login", () => {
  it("calls useHandleAuth on render", () => {
    mockUseHandleAuth.mockReturnValue(undefined)
    render(<Login />)
    expect(mockUseHandleAuth).toHaveBeenCalled()
  })
})
