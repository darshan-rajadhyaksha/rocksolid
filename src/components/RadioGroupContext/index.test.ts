import { describe, it, expect } from "vitest";
import { useRadioGroupContext } from "./RadioGroupContext";

describe("useRadioGroupContext hook", () => {
  it("should not throw error when used outside RadioGroupContext Provider", () => {
    expect(() => useRadioGroupContext()).not.toThrow();
  });
});