import { handleHours, setProgressBar } from "../utils"

describe("handleHours", () => {
  it("returns '72+' for hours above 72", () => {
    expect(handleHours(80)).toBe("72+")
    expect(handleHours(73)).toBe("72+")
  })

  it("returns the number as a string for 72 or fewer hours", () => {
    expect(handleHours(72)).toBe("72")
    expect(handleHours(48)).toBe("48")
    expect(handleHours(0)).toBe("0")
  })
})

describe("setProgressBar", () => {
  it("returns success class for hours above 72", () => {
    expect(setProgressBar(80)).toBe("progress-success")
  })

  it("returns success with reduced opacity for exactly 72 hours", () => {
    expect(setProgressBar(72)).toBe("progress-success opacity-30")
  })

  it("returns warning class for hours below 72", () => {
    expect(setProgressBar(48)).toBe("progress-warning bg-warning/20")
    expect(setProgressBar(0)).toBe("progress-warning bg-warning/20")
  })
})
