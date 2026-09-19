import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import AlertIcon from "./Alert";
import AngleDownIcon from "./AngleDown";
import AngleUpIcon from "./AngleUp";
import CheckboxCheckedIcon from "./CheckboxChecked";
import CheckboxUncheckedIcon from "./CheckboxUnchecked";
import CheckmarkIcon from "./Checkmark";
import CrossIcon from "./Cross";
import ErrorIcon from "./Error";
import InfoIcon from "./Info";
import RadioCheckedIcon from "./RadioChecked";
import RadioUncheckedIcon from "./RadioUnchecked";
import WarningIcon from "./Warning";

const icons = {
  AlertIcon,
  AngleDownIcon,
  AngleUpIcon,
  CheckboxCheckedIcon,
  CheckboxUncheckedIcon,
  CheckmarkIcon,
  CrossIcon,
  ErrorIcon,
  InfoIcon,
  RadioCheckedIcon,
  RadioUncheckedIcon,
  WarningIcon,
};

describe("Icons", () => {
  Object.entries(icons).forEach(([icon, Component]) => {
    it(`should render the ${icon}`, () => {
      const iconTestId = "icon-test-id";
      render(() => (
        <Component
          role="img"
          data-testId={iconTestId}
        />
      ));
      const iconElement = screen.getByRole("img", { hidden: true });
      expect(iconElement).toBeVisible();
      expect(iconElement.tagName.toLowerCase()).toBe("svg");
      expect(iconElement).toHaveAttribute("aria-hidden", "true");
    });
  });
});