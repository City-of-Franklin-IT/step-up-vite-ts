import { renderHook, act } from "@testing-library/react"
import { useHandleShiftBtns, useHandleRemoveFilterBtn } from "../hooks"
import StepUpCtx from "../../../context"

const createWrapper = (shiftFilter: "A" | "B" | "C" | "" = "") => {
  const ctxValue = {
    filter: "",
    shiftFilter,
    skillsFilter: "",
    searchValue: "",
    showAllStaff: false,
    dispatch: vi.fn()
  }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

describe("useHandleShiftBtns", () => {
  it("is visible when no shift filter is active", () => {
    const { result } = renderHook(() => useHandleShiftBtns(), { wrapper: createWrapper("") })
    expect(result.current.visible).toBe(true)
  })

  it("is hidden when a shift filter is active", () => {
    const { result } = renderHook(() => useHandleShiftBtns(), { wrapper: createWrapper("A") })
    expect(result.current.visible).toBe(false)
  })

  it("onClick dispatches SET_SHIFT_FILTER with the button value", () => {
    const mockDispatch = vi.fn()
    const ctxValue = { filter: "", shiftFilter: "" as const, skillsFilter: "", searchValue: "", showAllStaff: false, dispatch: mockDispatch }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
    )
    const { result } = renderHook(() => useHandleShiftBtns(), { wrapper })
    act(() => {
      result.current.onClick({ currentTarget: { value: "B" } } as React.MouseEvent<HTMLButtonElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHIFT_FILTER", payload: "B" })
  })
})

describe("useHandleRemoveFilterBtn (shift)", () => {
  it("is hidden when no shift filter is active", () => {
    const { result } = renderHook(() => useHandleRemoveFilterBtn(), { wrapper: createWrapper("") })
    expect(result.current.visible).toBe(false)
  })

  it("is visible when a shift filter is active", () => {
    const { result } = renderHook(() => useHandleRemoveFilterBtn(), { wrapper: createWrapper("C") })
    expect(result.current.visible).toBe(true)
  })

  it("onClick clears the shift filter", () => {
    const mockDispatch = vi.fn()
    const ctxValue = { filter: "", shiftFilter: "A" as const, skillsFilter: "", searchValue: "", showAllStaff: false, dispatch: mockDispatch }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
    )
    const { result } = renderHook(() => useHandleRemoveFilterBtn(), { wrapper })
    act(() => { result.current.onClick() })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHIFT_FILTER", payload: "" })
  })
})
