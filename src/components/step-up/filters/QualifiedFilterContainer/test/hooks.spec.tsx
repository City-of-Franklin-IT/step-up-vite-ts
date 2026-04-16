import { renderHook, act } from "@testing-library/react"
import { useHandleButtons } from "../hooks"
import StepUpCtx from "../../../context"

const createWrapper = (filter = "") => {
  const ctxValue = {
    filter,
    shiftFilter: "" as const,
    skillsFilter: "",
    searchValue: "",
    showAllStaff: false,
    dispatch: vi.fn()
  }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

describe("useHandleButtons (qualified filter)", () => {
  it("showRemoveBtn is false when no filter is active", () => {
    const { result } = renderHook(() => useHandleButtons(), { wrapper: createWrapper("") })
    expect(result.current.showRemoveBtn).toBe(false)
  })

  it("showRemoveBtn is true when a filter is active", () => {
    const { result } = renderHook(() => useHandleButtons(), { wrapper: createWrapper("Engineer") })
    expect(result.current.showRemoveBtn).toBe(true)
  })

  it("onClick dispatches SET_FILTER with the button value", () => {
    const mockDispatch = vi.fn()
    const ctxValue = {
      filter: "",
      shiftFilter: "" as const,
      skillsFilter: "",
      searchValue: "",
      showAllStaff: false,
      dispatch: mockDispatch
    }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
    )
    const { result } = renderHook(() => useHandleButtons(), { wrapper })
    act(() => {
      result.current.onClick({ currentTarget: { value: "Captain" } } as React.MouseEvent<HTMLButtonElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_FILTER", payload: "Captain" })
  })
})
