import { describe, it, expect } from "vitest";
import { useAccordionContext } from "./AccordionContext";

describe("useAccordionContext hook", () => {
  it("throws when used outside AccordionContent provider", () => {
    expect(() => useAccordionContext()).toThrow(
      "AccordionSummary and AccordionDetails must be used inside an Accordion component."
    );
  });
});