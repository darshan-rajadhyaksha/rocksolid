import { describe, it, expect } from "vitest";
import { useTableHeadContext } from "./TableHeadContext";

describe("useTableHeadContext hook", () => {
  it("should not throw an error when used outside TableHeadContext provider", () => {
    expect(() => useTableHeadContext()).not.toThrow();
  });
});