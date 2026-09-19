import { describe, it, expect } from "vitest";
import asVariants from "./asVariant";
import typedKeys from "./typedKeys";
import theme from "@/components/styles/theme";

describe("utils function", () => {
  it("should return variants", () => {
    expect(
      asVariants(theme.typography.colors, (config) => config)
    ).toMatchObject(theme.typography.colors);
  });

  it("should return keys of object", () => {
    expect(
      typedKeys(theme.typography.colors)
    ).toMatchObject(["textPrimary", "textSecondary", "textTertiary"]);
  });
});