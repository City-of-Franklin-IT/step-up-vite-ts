import { renderHook, act } from "@testing-library/react"
import { useHandleSkillsBtns, useHandleRemoveFilterBtn } from "../hooks"
import StepUpCtx from "../../../context"

const createWrapper = (skillsFilter = "") => {
  const ctxValue = {
    filter: "",
    shiftFilter: "" as const,
    skillsFilter,
    searchValue: "",
    showAllStaff: false,
    dispatch: vi.fn()
  }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

describe("useHandleSkillsBtns", () => {
  it("is visible when no skills filter is active", () => {
    const { result } = renderHook(() => useHandleSkillsBtns(), { wrapper: createWrapper("") })
    expect(result.current.visible).toBe(true)
  })

  it("is hidden when a skills filter is active", () => {
    const { result } = renderHook(() => useHandleSkillsBtns(), { wrapper: createWrapper("Paramedic") })
    expect(result.current.visible).toBe(false)
  })

  it("onClick dispatches SET_SKILLS_FILTER with the button value", () => {
    const mockDispatch = vi.fn()
    const ctxValue = { filter: "", shiftFilter: "" as const, skillsFilter: "", searchValue: "", showAllStaff: false, dispatch: mockDispatch }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
    )
    const { result } = renderHook(() => useHandleSkillsBtns(), { wrapper })
    act(() => {
      result.current.onClick({ currentTarget: { value: "Hazmat" } } as React.MouseEvent<HTMLButtonElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SKILLS_FILTER", payload: "Hazmat" })
  })
})

describe("useHandleRemoveFilterBtn (skills)", () => {
  it("is hidden when no skills filter is active", () => {
    const { result } = renderHook(() => useHandleRemoveFilterBtn(), { wrapper: createWrapper("") })
    expect(result.current.visible).toBe(false)
  })

  it("is visible when a skills filter is active", () => {
    const { result } = renderHook(() => useHandleRemoveFilterBtn(), { wrapper: createWrapper("Paramedic") })
    expect(result.current.visible).toBe(true)
  })

  it("onClick clears the skills filter", () => {
    const mockDispatch = vi.fn()
    const ctxValue = { filter: "", shiftFilter: "" as const, skillsFilter: "Hazmat", searchValue: "", showAllStaff: false, dispatch: mockDispatch }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
    )
    const { result } = renderHook(() => useHandleRemoveFilterBtn(), { wrapper })
    act(() => { result.current.onClick() })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SKILLS_FILTER", payload: "" })
  })
})
