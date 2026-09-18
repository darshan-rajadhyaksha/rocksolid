import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Select, { type SelectProps } from "@/components/Select";
import Label from "@/components/Label";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import userEvent from "@testing-library/user-event";

const colors = [
  "default",
  "success",
  "warning",
  "info",
  "error",
] as const;

const sizes = [
  "small",
  "medium",
  "large",
] as const;

const variants = [
  "filled",
  "outlined",
  "ghost",
] as const;

const getMockOptions = () => ([
  { label: "Mumbai", value: "mumbai", disabled: false, },
  { label: "Pune", value: "pune", disabled: false, },
  { label: "Nashik", value: "nashik", disabled: false, },
]);

const renderSelectComponent = (
  props?: SelectProps,
) => {
  return render(() => (
    <div>
      <Label for="city">City</Label>
      <Select 
        id="city"
        {...props}
      />
    </div>
  ));
};

describe("Select component", () => {
  it("should render the select", () => {
    const mockOptions = getMockOptions();
    renderSelectComponent({
      options: mockOptions,
    });
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    expect(selectElement).toHaveClass(
      "outline-0",
      theme.rounded.small,
      theme.focus,
    );
    const optionElements = within(selectElement).queryAllByRole("option");
    expect(optionElements).toHaveLength(mockOptions.length);
    optionElements.forEach((optionElement) => {
      expect(optionElement).toBeVisible();
      expect(optionElement).toHaveClass(
        "bg-white dark:bg-neutral-950",
        "text-neutral-50 dark:text-white",
      );
    });
  });

  /** class prop */
  it("should apply custom class to select element", () => {
    const mockOptions = getMockOptions();
    const mockProps = {
      class: "test-class",
      options: mockOptions,
    };
    renderSelectComponent(mockProps);
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    expect(selectElement).toHaveClass(mockProps.class);
  });

  /** color prop */
  colors.forEach((color) => {
    variants.forEach((variant) => {
      it(`should render select with color=${color}, variant=${variant} and disabled=false`, () => {
        renderSelectComponent({
          color,
          variant,
          disabled: false,
          options: getMockOptions(),
        });
        const selectElement = screen.getByLabelText("City");
        expect(selectElement).toBeVisible();
        /** Asset classes */
        expect(selectElement).toHaveClass(
          variant === "outlined" ? "border-1" : "",
          theme.colors[color][variant].background,
          theme.colors[color][variant].border,
          theme.colors[color][variant].text,
        );
      });
      it(`should render select with color=${color}, variant=${variant} and disabled=true`, () => {
        renderSelectComponent({
          color,
          variant,
          disabled: true,
          options: getMockOptions(),
        });
        const selectElement = screen.getByLabelText("City");
        expect(selectElement).toBeVisible();
        // /** Asset classes */
        expect(selectElement).toHaveClass(
          theme.disabled.text,
        );
        if (variant === "filled") {
          expect(selectElement).toHaveClass(
            theme.disabled.background,
          );
        }
        if (variant === "outlined") {
          expect(selectElement).toHaveClass(
            "border-1",
            theme.disabled.border,
          );
        }
      });
    });
  });

  /** disabled prop */
  it("should disable the select", () => {
    const mockProps = {
      disabled: true,
      options: getMockOptions(),
    };
    renderSelectComponent(mockProps);
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    expect(selectElement).toBeDisabled();
  });

  /** fullWidth prop */
  it("should not apply full width to select", () => {
    const mockProps = {
      fullWidth: false,
      options: getMockOptions(),
    };
    renderSelectComponent(mockProps);
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    expect(selectElement).not.toHaveClass("w-full");
  });

  it("should apply full width to select", () => {
    const mockProps = {
      fullWidth: true,
      options: getMockOptions(),
    };
    renderSelectComponent(mockProps);
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    expect(selectElement).toHaveClass("w-full");
  });

  /** options */
  it("should render the options of select", () => {
    const mockOptions = getMockOptions();
    mockOptions[1].disabled = true;
    const mockProps = {
      options: mockOptions,
    };
    renderSelectComponent(mockProps);
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    const options = within(selectElement).getAllByRole("option");
    options.forEach((optionElement, index) => {
      expect(optionElement).toBeVisible();
      expect(optionElement).toHaveValue(mockOptions[index].value);
      expect(optionElement).toHaveTextContent(mockOptions[index].label);
      if (mockOptions[index].disabled) {
        expect(optionElement).toBeDisabled();
        expect(optionElement).toHaveClass(
          "bg-white dark:bg-neutral-950",
          theme.disabled.text,
        );
      } else {
        expect(optionElement).toBeEnabled();
        expect(optionElement).toHaveClass(
          "bg-white dark:bg-neutral-950",
          "text-neutral-50 dark:text-white",
        );
      }
    });
  });

  it("should render select without options", () => {
    renderSelectComponent();
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    const options = within(selectElement).queryAllByRole("option");
    expect(options).toHaveLength(0);
  });

  /** value & onChange props */
  it("should show default value of select and call onChange callback when changed", async () => {
    const mockProps = {
      fullWidth: true,
      options: getMockOptions(),
      value: "nashik",
      onChange: vi.fn(),
    };
    renderSelectComponent(mockProps);
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    expect(selectElement).toHaveValue(mockProps.value);
    await userEvent.selectOptions(selectElement, "mumbai");
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          tagName: "SELECT",
          value: "mumbai",
        }),
      }),
    );
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render select with size=${size}`, () => {
      const mockProps = {
        size,
        options: getMockOptions(),
      };
      renderSelectComponent(mockProps);
      const selectElement = screen.getByLabelText("City");
      expect(selectElement).toBeVisible();
      switch(size) {
        case "small":
          expect(selectElement).toHaveClass(
            "py-1",
            "px-1.5",
            "h-6",
            "text-sm",
          );
          break;
        case "medium":
          expect(selectElement).toHaveClass(
            "py-1",
            "px-1.5",
            "h-8",
            "text-sm",
          );
          break;
        case "large":
          expect(selectElement).toHaveClass(
            "py-1.5",
            "px-2",
            "h-10",
            "text-md",
          );
          break;
      }
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      option: { "data-testId": "test-option-slot-id", class: "test-class-option", },
    };
    renderSelectComponent({
      options: getMockOptions(),
      slotProps,
    });
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    const optionElements = within(selectElement).queryAllByRole("option");
    expect(optionElements).toHaveLength(3);
    optionElements.forEach((optionElement) => {
      expect(optionElement).toBeVisible();
      expect(optionElement).toHaveAttribute("data-testId", slotProps.option["data-testId"]);
      expect(optionElement).toHaveClass(slotProps.option.class);
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "border-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          outlined: {
            border: customClass,
          }
        },
      }
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <div>
          <Label for="city">City</Label>
          <Select 
            id="city"
            options={getMockOptions()}
          />
        </div>
      </ThemeProvider>
    ));
    const selectElement = screen.getByLabelText("City");
    expect(selectElement).toBeVisible();
    expect(selectElement).toHaveClass(customClass);
  });
});