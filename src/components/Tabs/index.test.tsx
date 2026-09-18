import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import Tab from "@/components/Tab";
import TabsContext from "@/components/TabsContext";
import TabPanel from "@/components/TabPanel";
import Tabs, { type TabsProps } from "@/components/Tabs";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderTabsComponent = (
  props?: TabsProps
) => {
  return render(() => (
    <TabsContext defaultValue="home">
      <Tabs
        {...props}
      >
        <Tab label="Home" value="home" />
        <Tab label="Profile" value="profile" />
        <Tab label="Settings" value="settings" />
      </Tabs>
      <TabPanel value="home" tabIndex={0}>
        Welcome to the home page.
      </TabPanel>
      <TabPanel value="profile" tabIndex={0}>
        View and manage your profile.
      </TabPanel>
      <TabPanel value="settings" tabIndex={0}>
        Manage your account settings.
      </TabPanel>
    </TabsContext>
  ));
};

describe("Tabs component", () => {
  it("should render the tabs", async () => {
    renderTabsComponent();
    const tabListElement = screen.getByRole("tablist");
    expect(tabListElement).toBeVisible();
    expect(tabListElement).toHaveClass(
      "relative",
      "flex",
      "items-stretch",
      theme.divider,
    )
  });

  /** centered and orientation prop */
  it("should render the horizontally centered tabs", async () => {
    const mockProps = {
      centered: true,
    };
    renderTabsComponent(mockProps);
    const tabListElement = screen.getByRole("tablist");
    expect(tabListElement).toBeVisible();
    expect(tabListElement).toHaveClass(
      "justify-center",
      "flex-row",
      "border-b",
    );
  });

  it("should render the vertically centered tabs", async () => {
    const mockProps = {
      centered: true,
      orientation: "vertical" as const,
    };
    renderTabsComponent(mockProps);
    const tabListElement = screen.getByRole("tablist");
    expect(tabListElement).toBeVisible();
    expect(tabListElement).toHaveClass(
      "items-center",
      "flex-col",
      "ltr:border-r",
      "rtl:border-l",
    );
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "border-zinc-500";
    const theme = createTheme({
      divider: customClass,
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <TabsContext defaultValue="home">
          <Tabs>
            <Tab label="Home" value="home" />
            <Tab label="Profile" value="profile" />
            <Tab label="Settings" value="settings" />
          </Tabs>
          <TabPanel value="home" tabIndex={0}>
            Welcome to the home page.
          </TabPanel>
          <TabPanel value="profile" tabIndex={0}>
            View and manage your profile.
          </TabPanel>
          <TabPanel value="settings" tabIndex={0}>
            Manage your account settings.
          </TabPanel>
        </TabsContext>
      </ThemeProvider>
    ));
    const tabListElement = screen.getByRole("tablist");
    expect(tabListElement).toBeVisible();
    expect(tabListElement).toHaveClass(customClass);
  });
});