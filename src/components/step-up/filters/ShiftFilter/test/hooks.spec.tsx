import { renderHook, act } from "@testing-library/react"
import { useHandleShiftFilter } from "../hooks"
import StepUpCtx from "../../../context"

const createWrapper = (shiftFilter: "A" | "B" | "C" | "" = "", dispatch = vi.fn()) => {
  const ctxValue = {
    filter: "",
    shiftFilter,
    skillsFilter: "",
    searchValue: "",
    showAllStaff: false,
    dispatch
  }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

describe("useHandleShiftFilter", () => {
  it("returns the current shift filter as the select value", () => {
    const { result } = renderHook(() => useHandleShiftFilter(), { wrapper: createWrapper("A") })
    expect(result.current.value).toBe("A")
  })

  it("onChange dispatches SET_SHIFT_FILTER with the selected value", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleShiftFilter(), { wrapper: createWrapper("", mockDispatch) })
    act(() => {
      result.current.onChange({ target: { value: "B" } } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHIFT_FILTER", payload: "B" })
  })

  it("onChange dispatches SET_SHIFT_FILTER with an empty payload when 'All' is selected", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleShiftFilter(), { wrapper: createWrapper("A", mockDispatch) })
    act(() => {
      result.current.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHIFT_FILTER", payload: "" })
  })
})
