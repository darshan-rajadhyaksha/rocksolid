import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import TabPanel, { type TabPanelProps } from "@/components/TabPanel";
import TabsContext from "@/components/TabsContext";

const renderTabPanelComponent = (
  props?: TabPanelProps
) => {
  return render(() => (
    <TabsContext defaultValue="home">
      <TabPanel
        value="home"
        {...props}
      >
        Hello World
      </TabPanel>
    </TabsContext>
  ));
};

describe("TabPanel component", () => {
  it("should render the tab panel", async () => {
    renderTabPanelComponent();
    const tabPanelElement = screen.getByRole("tabpanel");
    expect(tabPanelElement).toBeVisible();
    expect(tabPanelElement).toHaveTextContent("Hello World");
  });

  /** class prop */
  it("should add custom class to tab panel", () => {
    const mockProps = {
      class: "test-class",
      value: "home",
    };
    renderTabPanelComponent(mockProps);
    const tabPanelElement = screen.getByRole("tabpanel");
    expect(tabPanelElement).toBeVisible();
    expect(tabPanelElement).toHaveClass(mockProps.class);
  });
});