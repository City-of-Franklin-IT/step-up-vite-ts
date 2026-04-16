import { useContext } from "react"
import { renderHook, act } from "@testing-library/react"
import { HeaderProvider } from "../context"
import HeaderCtx from "../context"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <HeaderProvider>{children}</HeaderProvider>
)

describe("HeaderCtx reducer", () => {
  it("initializes with Login as the active page", () => {
    const { result } = renderHook(() => useContext(HeaderCtx), { wrapper })
    expect(result.current.activePage).toBe("Login")
  })

  it("SET_ACTIVE_PAGE updates to Step Up", () => {
    const { result } = renderHook(() => useContext(HeaderCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_ACTIVE_PAGE", payload: "Step Up" }) })
    expect(result.current.activePage).toBe("Step Up")
  })

  it("SET_ACTIVE_PAGE updates to Rosters", () => {
    const { result } = renderHook(() => useContext(HeaderCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_ACTIVE_PAGE", payload: "Rosters" }) })
    expect(result.current.activePage).toBe("Rosters")
  })
})
