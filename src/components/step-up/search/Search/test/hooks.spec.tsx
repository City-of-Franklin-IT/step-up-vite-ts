import { renderHook, act } from "@testing-library/react"
import { useHandleSearch, useHandleClearBtn } from "../hooks"
import StepUpCtx from "../../../context"

const createWrapper = (searchValue = "", mockDispatch = vi.fn()) => {
  const ctxValue = {
    filter: "",
    shiftFilter: "" as const,
    skillsFilter: "",
    searchValue,
    showAllStaff: false,
    dispatch: mockDispatch
  }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

describe("useHandleSearch", () => {
  beforeAll(() => { vi.useFakeTimers() })
  afterEach(() => { vi.clearAllTimers() })

  it("does not dispatch immediately on input change", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleSearch(), { wrapper: createWrapper("", mockDispatch) })
    act(() => {
      result.current.onChange({ currentTarget: { value: "Smith" } } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: "SET_SEARCH_VALUE" }))
  })

  it("dispatches SET_SEARCH_VALUE after 500ms debounce", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleSearch(), { wrapper: createWrapper("", mockDispatch) })
    act(() => {
      result.current.onChange({ currentTarget: { value: "Smith" } } as React.ChangeEvent<HTMLInputElement>)
    })
    act(() => { vi.advanceTimersByTime(500) })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SEARCH_VALUE", payload: "Smith" })
  })

  it("cancels previous debounce when input changes rapidly", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleSearch(), { wrapper: createWrapper("", mockDispatch) })
    act(() => {
      result.current.onChange({ currentTarget: { value: "Smi" } } as React.ChangeEvent<HTMLInputElement>)
    })
    act(() => { vi.advanceTimersByTime(200) })
    act(() => {
      result.current.onChange({ currentTarget: { value: "Smith" } } as React.ChangeEvent<HTMLInputElement>)
    })
    act(() => { vi.advanceTimersByTime(500) })
    const calls = mockDispatch.mock.calls.filter(c => c[0].type === "SET_SEARCH_VALUE")
    expect(calls).toHaveLength(1)
    expect(calls[0][0].payload).toBe("Smith")
  })

  it("reflects the local input value immediately before debounce", () => {
    const { result } = renderHook(() => useHandleSearch(), { wrapper: createWrapper() })
    act(() => {
      result.current.onChange({ currentTarget: { value: "Doe" } } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.value).toBe("Doe")
  })
})

describe("useHandleClearBtn", () => {
  it("is disabled when no search value exists", () => {
    const { result } = renderHook(() => useHandleClearBtn(), { wrapper: createWrapper("") })
    expect(result.current.disabled).toBe(true)
  })

  it("is enabled when a search value exists", () => {
    const { result } = renderHook(() => useHandleClearBtn(), { wrapper: createWrapper("Smith") })
    expect(result.current.disabled).toBe(false)
  })

  it("onClick dispatches SET_SEARCH_VALUE with empty string", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleClearBtn(), { wrapper: createWrapper("Smith", mockDispatch) })
    act(() => { result.current.onClick() })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SEARCH_VALUE", payload: "" })
  })
})
