import { handleTime, authHeaders } from "../utils"

describe("handleTime", () => {
  it("extracts HH:MM from an ISO timestamp", () => {
    expect(handleTime("2024-01-15T08:30:00Z")).toBe("08:30")
  })

  it("handles timestamps with milliseconds", () => {
    expect(handleTime("2024-01-15T14:45:30.000Z")).toBe("14:45")
  })
})

describe("authHeaders", () => {
  it("appends Authorization header when a token is provided", () => {
    const headers = authHeaders("my-token")
    expect(headers.get("Authorization")).toBe("Bearer my-token")
  })

  it("returns empty headers when token is undefined", () => {
    const headers = authHeaders(undefined)
    expect(headers.get("Authorization")).toBeNull()
  })
})
