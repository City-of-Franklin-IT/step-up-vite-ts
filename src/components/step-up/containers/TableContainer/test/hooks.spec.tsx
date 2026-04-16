import { renderHook } from "@testing-library/react"
import { useHandleTableContainer } from "../hooks"
import StepUpCtx from "../../../context"

// Types
import * as AppTypes from "@/context/App/AppTypes"

const defaultCtx = {
  filter: "",
  shiftFilter: "" as AppTypes.ShiftType | "",
  skillsFilter: "",
  searchValue: "",
  showAllStaff: false,
  dispatch: vi.fn()
}

const createWrapper = (overrides: Partial<typeof defaultCtx> = {}) => {
  const ctxValue = { ...defaultCtx, ...overrides }
  return ({ children }: { children: React.ReactNode }) => (
    <StepUpCtx.Provider value={ctxValue}>{children}</StepUpCtx.Provider>
  )
}

const makeStaff = (overrides: Partial<AppTypes.StaffInterface> = {}): AppTypes.StaffInterface => ({
  employeeId: "001",
  rank: "Firefighter",
  fullName: "Test Employee",
  skills: "",
  phone: "",
  email: "",
  shift: "A",
  StepUps: [{ detailCode: "ENG", hours: 8 }],
  Schedules: [],
  ...overrides
})

describe("useHandleTableContainer", () => {
  it("returns empty arrays when staff is undefined", () => {
    const { result } = renderHook(
      () => useHandleTableContainer(undefined),
      { wrapper: createWrapper() }
    )
    expect(result.current.tableData).toHaveLength(0)
    expect(result.current.skills).toHaveLength(0)
  })

  it("sums step-up hours across multiple StepUps entries", () => {
    const staff = [
      makeStaff({ StepUps: [{ detailCode: "ENG", hours: 40 }, { detailCode: "ENG", hours: 32 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ showAllStaff: true }) }
    )
    expect(result.current.tableData[0].hours).toBe(72)
  })

  it("excludes employees with 0 hours when showAllStaff is false", () => {
    const staff = [
      makeStaff({ employeeId: "001", StepUps: [{ detailCode: "ENG", hours: 0 }] }),
      makeStaff({ employeeId: "002", StepUps: [{ detailCode: "ENG", hours: 8 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ showAllStaff: false }) }
    )
    expect(result.current.tableData).toHaveLength(1)
    expect(result.current.tableData[0].employeeId).toBe("002")
  })

  it("includes 0-hour employees when showAllStaff is true", () => {
    const staff = [
      makeStaff({ employeeId: "001", StepUps: [{ detailCode: "ENG", hours: 0 }] }),
      makeStaff({ employeeId: "002", StepUps: [{ detailCode: "ENG", hours: 8 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ showAllStaff: true }) }
    )
    expect(result.current.tableData).toHaveLength(2)
  })

  it("filters by shift when shiftFilter is set", () => {
    const staff = [
      makeStaff({ employeeId: "001", shift: "A", StepUps: [{ detailCode: "ENG", hours: 8 }] }),
      makeStaff({ employeeId: "002", shift: "B", StepUps: [{ detailCode: "ENG", hours: 8 }] }),
      makeStaff({ employeeId: "003", shift: "C", StepUps: [{ detailCode: "ENG", hours: 8 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ shiftFilter: "A" }) }
    )
    expect(result.current.tableData).toHaveLength(1)
    expect(result.current.tableData[0].shift).toBe("A")
  })

  it("filters by skills when skillsFilter is set", () => {
    const staff = [
      makeStaff({ employeeId: "001", skills: "Paramedic", StepUps: [{ detailCode: "ENG", hours: 8 }] }),
      makeStaff({ employeeId: "002", skills: "Hazmat", StepUps: [{ detailCode: "ENG", hours: 8 }] }),
      makeStaff({ employeeId: "003", skills: "Paramedic, Hazmat", StepUps: [{ detailCode: "ENG", hours: 8 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ skillsFilter: "Paramedic" }) }
    )
    expect(result.current.tableData).toHaveLength(2)
    expect(result.current.tableData.map(d => d.employeeId)).toEqual(expect.arrayContaining(["001", "003"]))
  })

  it("filters by search value using case-insensitive match", () => {
    const staff = [
      makeStaff({ employeeId: "001", fullName: "John Smith", StepUps: [{ detailCode: "ENG", hours: 8 }] }),
      makeStaff({ employeeId: "002", fullName: "Jane Doe", StepUps: [{ detailCode: "ENG", hours: 8 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ searchValue: "smith" }) }
    )
    expect(result.current.tableData).toHaveLength(1)
    expect(result.current.tableData[0].fullName).toBe("John Smith")
  })

  it("applies the qualified filter to return promotion-eligible staff only", () => {
    const staff = [
      makeStaff({ employeeId: "001", rank: "Firefighter", StepUps: [{ detailCode: "ENG", hours: 72 }] }),
      makeStaff({ employeeId: "002", rank: "Firefighter", StepUps: [{ detailCode: "ENG", hours: 71 }] }),
      makeStaff({ employeeId: "003", rank: "Engineer", StepUps: [{ detailCode: "ENG", hours: 100 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ filter: "Engineer" }) }
    )
    expect(result.current.tableData).toHaveLength(1)
    expect(result.current.tableData[0].employeeId).toBe("001")
  })

  it("derives a unique skills list from the filtered table data", () => {
    const staff = [
      makeStaff({ employeeId: "001", skills: "Paramedic, Hazmat", StepUps: [{ detailCode: "ENG", hours: 8 }] }),
      makeStaff({ employeeId: "002", skills: "Paramedic", StepUps: [{ detailCode: "ENG", hours: 8 }] })
    ]
    const { result } = renderHook(
      () => useHandleTableContainer(staff),
      { wrapper: createWrapper({ showAllStaff: true }) }
    )
    expect(result.current.skills).toHaveLength(2)
    expect(result.current.skills).toEqual(expect.arrayContaining(["Paramedic", "Hazmat"]))
  })
})
