import { renderHook, act } from "@testing-library/react"
import { useHandleSkillsFilter } from "../hooks"
import StepUpCtx from "../../../context"

const createWrapper = (skillsFilter = "", dispatch = vi.fn()) => {
  const ctxValue = {
    filter: "",
    shiftFilter: "" as const,
    skillsFilter,
    searchValue: "",
    showAllStaff: false,
    dispatch
  }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

describe("useHandleSkillsFilter", () => {
  it("returns the current skills filter as the select value", () => {
    const { result } = renderHook(() => useHandleSkillsFilter(), { wrapper: createWrapper("Paramedic") })
    expect(result.current.value).toBe("Paramedic")
  })

  it("onChange dispatches SET_SKILLS_FILTER with the selected value", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleSkillsFilter(), { wrapper: createWrapper("", mockDispatch) })
    act(() => {
      result.current.onChange({ target: { value: "Hazmat" } } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SKILLS_FILTER", payload: "Hazmat" })
  })

  it("onChange dispatches SET_SKILLS_FILTER with an empty payload when 'All' is selected", () => {
    const mockDispatch = vi.fn()
    const { result } = renderHook(() => useHandleSkillsFilter(), { wrapper: createWrapper("Paramedic", mockDispatch) })
    act(() => {
      result.current.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SKILLS_FILTER", payload: "" })
  })
})
