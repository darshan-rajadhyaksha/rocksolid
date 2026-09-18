import { describe, it, expect } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import Tab, { type TabProps } from "@/components/Tab";
import TabsContext from "@/components/TabsContext";
import Tabs from "@/components/Tabs";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const iconPositions = [
  "top",
  "bottom",
  "start",
  "end",
] as const;

const renderTabComponent = (
  props?: TabProps
) => {
  return render(() => (
    <TabsContext defaultValue="home">
      <Tab
        label="Home"
        value="home"
        {...props}
      />
    </TabsContext>
  ));
};

describe("Tab component", () => {
  it("should render the tab", async () => {
    renderTabComponent();
    const tabElement = screen.getByRole("tab");
    expect(tabElement).toBeVisible();
    expect(tabElement).toHaveClass(
      "py-2",
      "px-4",
      "min-w-15",
      "min-h-8",
      "items-center",
      "justify-center",
      "gap-y-0",
      "gap-x-1",
      theme.rounded.none,
    );
  });

  /** class prop */
  it("should add custom class to tab", () => {
    const mockProps = {
      class: "test-class",
      value: "home",
    };
    renderTabComponent(mockProps);
    const tabElement = screen.getByRole("tab", { name: "Home" });
    expect(tabElement).toBeVisible();
    expect(tabElement).toHaveClass(mockProps.class);
  });

  /** icon prop */
  it("should add custom icon to tab", () => {
    const iconTestId = "icon-test-id";
    const mockProps = {
      icon: <span data-testId={iconTestId} />,
      value: "home",
    };
    renderTabComponent(mockProps);
    const tabElement = screen.getByRole("tab");
    expect(tabElement).toBeVisible();
    const iconElement = within(tabElement).getByTestId(iconTestId);
    expect(iconElement).toBeVisible();
  });

  /** iconPosition prop */
  iconPositions.forEach((iconPosition) => {
    it(`should positon the icon to ${iconPosition} in tab`, () => {
      const iconTestId = "icon-test-id";
      const mockProps = {
        icon: <span data-testId={iconTestId} />,
        value: "home",
        iconPosition,
      };
      renderTabComponent(mockProps);
      const tabElement = screen.getByRole("tab");
      expect(tabElement).toBeVisible();
      const iconElement = within(tabElement).getByTestId(iconTestId);
      expect(iconElement).toBeVisible();
      const iconPositionClassMap = {
        start: "flex-row",
        end: "flex-row-reverse",
        top: "flex-col",
        bottom: "flex-col-reverse",
      };
      expect(tabElement).toHaveClass(iconPositionClassMap[iconPosition]);
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      icon: { "data-testId": "test-icon-id", class: "test-class-icon", },
    };
    const iconTestId = "icon-test-id";
    const mockProps = {
      icon: <span data-testId={iconTestId} />,
      value: "home",
      slotProps,
    };
    renderTabComponent(mockProps);
    const tabElement = screen.getByRole("tab");
    expect(tabElement).toBeVisible();
    const iconSlotElement = within(tabElement).getByTestId(slotProps.icon["data-testId"]);
    expect(iconSlotElement).toBeVisible();
    expect(iconSlotElement).toHaveClass(slotProps.icon.class);
    const iconElement = within(tabElement).getByTestId(iconTestId);
    expect(iconElement.parentElement).toBe(iconSlotElement);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "rounded-[2px]";
    const theme = createTheme({
      rounded: {
        none: customClass,
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <TabsContext defaultValue="home">
          <Tabs>
            <Tab label="Home" value="home" />
          </Tabs>
        </TabsContext>
      </ThemeProvider>
    ));
    const tabElement = screen.getByRole("tab");
    expect(tabElement).toBeVisible();
    expect(tabElement).toHaveClass(customClass);
  });
});