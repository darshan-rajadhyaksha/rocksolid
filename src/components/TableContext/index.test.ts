import { describe, it, expect } from "vitest";
import { useTableContext } from "./TableContext";

describe("useTableContext hook", () => {
  it("should not throw an error when used outside TableContext provider", () => {
    expect(() => useTableContext()).not.toThrow();
  });
});