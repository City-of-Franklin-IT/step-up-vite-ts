import { renderHook, act } from "@testing-library/react"
import { useHandleQualifiedFilter } from "../hooks"
import StepUpCtx from "../../../context"

const createWrapper = (filter = "", dispatch = vi.fn()) => {
  const ctxValue = {
    filter,
    shiftFilter: "" as const,
    skillsFilter: "",
    searchValue: "",
    showAllStaff: false,
    dispatch
  }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

describe("useHandleQualifiedFilter", () => {
  it("returns the current filter as the select value", () => {
    const { result } = renderHook(() => useHandleQualifiedFilter(), { wrapper: createWrapper("Engineer") })
    expect(result.current.value).toBe("Engineer")
  })

  it("onChange dispatches SET_FILTER with the selected value", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleQualifiedFilter(), { wrapper: createWrapper("", mockDispatch) })
    act(() => {
      result.current.onChange({ target: { value: "Captain" } } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_FILTER", payload: "Captain" })
  })

  it("onChange dispatches SET_FILTER with an empty payload when 'All' is selected", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleQualifiedFilter(), { wrapper: createWrapper("Engineer", mockDispatch) })
    act(() => {
      result.current.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_FILTER", payload: "" })
  })
})
