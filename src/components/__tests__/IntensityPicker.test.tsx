import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { IntensityPicker } from "../IntensityPicker"

describe("IntensityPicker", () => {
  it("renders all intensity options", () => {
    const handleChange = vi.fn()
    render(<IntensityPicker value={null} onChange={handleChange} />)

    expect(screen.getByRole("radio", { name: /Relaxed/ })).toBeTruthy()
    expect(screen.getByRole("radio", { name: /Moderate/ })).toBeTruthy()
    expect(screen.getByRole("radio", { name: /Intense/ })).toBeTruthy()
  })

  it("emits change when selecting new option", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<IntensityPicker value="relaxed" onChange={handleChange} />)

    await user.click(screen.getByRole("radio", { name: /Moderate/ }))
    expect(handleChange).toHaveBeenCalledWith("moderate")
  })

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<IntensityPicker value="moderate" onChange={handleChange} />)

    const moderate = screen.getByRole("radio", { name: /Moderate/ })
    moderate.focus()
    await user.keyboard("{ArrowRight}")
    await user.keyboard("{Enter}")

    expect(handleChange).toHaveBeenCalledWith("intense")
  })
})
