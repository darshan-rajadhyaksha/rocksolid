import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Radio from "@/components/Radio";
import RadioGroup, { type RadioGroupProps } from "@/components/RadioGroup";
import Label from "@/components/Label";

const renderRadioGroupComponent = (
  props?: RadioGroupProps
) => {
  return render(() => (
    <RadioGroup
      name="plan"
      {...props}
    >
      <div class="flex items-center gap-1">
        <Radio id="free" value="free" />
        <Label for="free">Free</Label>
      </div>
      <div class="flex items-center gap-1">
        <Radio id="pro" value="pro" />
        <Label for="pro">Pro</Label>
      </div>
      <div class="flex items-center gap-1">
        <Radio id="enterprise" value="enterprise" />
        <Label for="enterprise">Enterprise</Label>
      </div>
    </RadioGroup>
  ));
};

describe("RadioGroup component", () => {
  it("should render the radio group", () => {
    const mockProps = {
      name: "plan",
    };
    renderRadioGroupComponent(mockProps);
    const radioGroupElement = screen.getByRole("radiogroup");
    expect(radioGroupElement).toBeVisible();
    const radioElements = within(radioGroupElement).getAllByRole("radio");
    expect(radioElements).toHaveLength(3);
    radioElements.forEach((radioElement) => {
      expect(radioElement).toHaveAttribute("name", mockProps.name);
    });
  });

  /** class prop */
  it("should apply custom class to radio group element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderRadioGroupComponent(mockProps);
    const radioGroupElement = screen.getByRole("radiogroup");
    expect(radioGroupElement).toBeVisible();
    expect(radioGroupElement).toHaveClass(mockProps.class);
  });

  /** defaultValue prop */
  it("should set default value to radio group element", async () => {
    const mockProps = {
      class: "test-class",
      name: "Plan",
      defaultValue: "pro",
    };
    renderRadioGroupComponent(mockProps);
    const radioGroupElement = screen.getByRole("radiogroup");
    expect(radioGroupElement).toBeVisible();
    const radioElements: HTMLInputElement[] = within(radioGroupElement).getAllByRole("radio");
    expect(radioElements).toHaveLength(3);
    radioElements.forEach((radioElement) => {
      expect(radioElement).toHaveAttribute("name", mockProps.name);
      if (radioElement.value === mockProps.defaultValue) {
        expect(radioElement).toBeChecked();
      } else {
        expect(radioElement).not.toBeChecked();
      }
    });
    await userEvent.click(radioElements[0]);
    radioElements.forEach((radioElement, index) => {
      if (index === 0) {
        expect(radioElement).toBeChecked();
      } else {
        expect(radioElement).not.toBeChecked();
      }
    });
  });

  /** value and onChange */
  it("should set value to radio group element and call onChange callback", async () => {
    const mockProps = {
      class: "test-class",
      name: "Plan",
      value: "pro",
      onChange: vi.fn(),
    };
    renderRadioGroupComponent(mockProps);
    const radioGroupElement = screen.getByRole("radiogroup");
    expect(radioGroupElement).toBeVisible();
    const radioElements: HTMLInputElement[] = within(radioGroupElement).getAllByRole("radio");
    expect(radioElements).toHaveLength(3);
    radioElements.forEach((radioElement) => {
      expect(radioElement).toHaveAttribute("name", mockProps.name);
      if (radioElement.value === mockProps.value) {
        expect(radioElement).toBeChecked();
      } else {
        expect(radioElement).not.toBeChecked();
      }
    });
    await userEvent.click(radioElements[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }),
      }),
      "free",
    );
  });
});