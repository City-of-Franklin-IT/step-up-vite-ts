import { useContext } from "react"
import { renderHook, act } from "@testing-library/react"
import { StepUpProvider } from "../context"
import StepUpCtx from "../context"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <StepUpProvider>{children as React.ReactElement}</StepUpProvider>
)

describe("StepUpCtx reducer", () => {
  it("initializes with empty filters and showAllStaff false", () => {
    const { result } = renderHook(() => useContext(StepUpCtx), { wrapper })
    expect(result.current.filter).toBe("")
    expect(result.current.shiftFilter).toBe("")
    expect(result.current.skillsFilter).toBe("")
    expect(result.current.searchValue).toBe("")
    expect(result.current.showAllStaff).toBe(false)
  })

  it("SET_FILTER updates the rank filter", () => {
    const { result } = renderHook(() => useContext(StepUpCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_FILTER", payload: "Engineer" }) })
    expect(result.current.filter).toBe("Engineer")
  })

  it("SET_SHIFT_FILTER updates the shift filter", () => {
    const { result } = renderHook(() => useContext(StepUpCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_SHIFT_FILTER", payload: "B" }) })
    expect(result.current.shiftFilter).toBe("B")
  })

  it("SET_SKILLS_FILTER updates the skills filter", () => {
    const { result } = renderHook(() => useContext(StepUpCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_SKILLS_FILTER", payload: "Paramedic" }) })
    expect(result.current.skillsFilter).toBe("Paramedic")
  })

  it("SET_SEARCH_VALUE updates the search value", () => {
    const { result } = renderHook(() => useContext(StepUpCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "SET_SEARCH_VALUE", payload: "Smith" }) })
    expect(result.current.searchValue).toBe("Smith")
  })

  it("TOGGLE_SHOW_ALL_STAFF flips the showAllStaff flag", () => {
    const { result } = renderHook(() => useContext(StepUpCtx), { wrapper })
    act(() => { result.current.dispatch({ type: "TOGGLE_SHOW_ALL_STAFF", payload: true }) })
    expect(result.current.showAllStaff).toBe(true)
    act(() => { result.current.dispatch({ type: "TOGGLE_SHOW_ALL_STAFF", payload: false }) })
    expect(result.current.showAllStaff).toBe(false)
  })

  it("dispatching multiple actions accumulates state changes", () => {
    const { result } = renderHook(() => useContext(StepUpCtx), { wrapper })
    act(() => {
      result.current.dispatch({ type: "SET_FILTER", payload: "Captain" })
      result.current.dispatch({ type: "SET_SHIFT_FILTER", payload: "A" })
    })
    expect(result.current.filter).toBe("Captain")
    expect(result.current.shiftFilter).toBe("A")
  })
})
