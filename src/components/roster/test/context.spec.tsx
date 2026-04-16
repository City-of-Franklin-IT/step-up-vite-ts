import { useContext } from "react"
import { renderHook, act } from "@testing-library/react"
import { RosterProvider } from "../context"
import RosterCtx from "../context"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RosterProvider>{children as React.ReactElement}</RosterProvider>
)

describe("RosterCtx reducer", () => {
  it("initializes with an empty rosterDate", () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    expect(result.current.rosterDate).toBe("")
  })

  it("SET_ROSTER_DATE updates the roster date", () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_ROSTER_DATE", payload: "2024-01-15" }) })
    expect(result.current.rosterDate).toBe("2024-01-15")
  })

  it("SET_ROSTER_DATE can be updated multiple times", () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_ROSTER_DATE", payload: "2024-01-15" }) })
    act(() => { result.current.dispatch({ type: "SET_ROSTER_DATE", payload: "2024-02-20" }) })
    expect(result.current.rosterDate).toBe("2024-02-20")
  })
})
