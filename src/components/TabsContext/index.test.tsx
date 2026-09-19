import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Tab from "@/components/Tab";
import TabsContext, { type TabsContextProps } from "@/components/TabsContext";
import TabPanel from "@/components/TabPanel";
import Tabs from "@/components/Tabs";

const renderTabsContextComponent = (
  props?: TabsContextProps
) => {
  return render(() => (
    <TabsContext
      {...props}
    >
      <Tabs class="mb-2">
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

describe("TabsContext component", () => {
  it("should render the tabs context", async () => {
    const mockProps = {
      defaultValue: "home",
      onChange: vi.fn(),
    };
    renderTabsContextComponent(mockProps);
    const tabListElement = screen.getByRole("tablist");
    expect(tabListElement).toBeVisible();
    const tabElements = within(tabListElement).getAllByRole("tab");
    expect(tabElements).toHaveLength(3);
    tabElements.forEach((tabElement, index) => {
      if (index === 0) {
        expect(tabElement).toHaveAttribute("aria-selected", "true");
      } else {
        expect(tabElement).toHaveAttribute("aria-selected", "false");
      }
    });
    const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
    expect(tabPanels).toHaveLength(3);
    tabPanels.forEach((tabPanel, index) => {
      if (index === 0) {
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabPanel).not.toBeVisible();
      }
    });
    await userEvent.click(tabElements[1]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          tagName: "BUTTON",
        }),
      }),
      "profile",
    );
    tabElements.forEach((tabElement, index) => {
      if (index === 1) {
        expect(tabElement).toHaveAttribute("aria-selected", "true");
      } else {
        expect(tabElement).toHaveAttribute("aria-selected", "false");
      }
    });
    tabPanels.forEach((tabPanel, index) => {
      if (index === 1) {
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabPanel).not.toBeVisible();
      }
    });
  });

  /** value and onChange prop */
  it("should call the onChange callback", async () => {
    const mockProps = {
      value: "home",
      onChange: vi.fn(),
    };
    renderTabsContextComponent(mockProps);
    const tabListElement = screen.getByRole("tablist");
    expect(tabListElement).toBeVisible();
    const tabElements = within(tabListElement).getAllByRole("tab");
    expect(tabElements).toHaveLength(3);
    tabElements.forEach((tabElement, index) => {
      if (index === 0) {
        expect(tabElement).toHaveAttribute("aria-selected", "true");
      } else {
        expect(tabElement).toHaveAttribute("aria-selected", "false");
      }
    });
    const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
    expect(tabPanels).toHaveLength(3);
    tabPanels.forEach((tabPanel, index) => {
      if (index === 0) {
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabPanel).not.toBeVisible();
      }
    });
    await userEvent.click(tabElements[1]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          tagName: "BUTTON",
        }),
      }),
      "profile",
    );
    tabElements.forEach((tabElement, index) => {
      if (index === 0) {
        expect(tabElement).toHaveAttribute("aria-selected", "true");
      } else {
        expect(tabElement).toHaveAttribute("aria-selected", "false");
      }
    });
    tabPanels.forEach((tabPanel, index) => {
      if (index === 0) {
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabPanel).not.toBeVisible();
      }
    });
  });

  /** tabId prop */
  it("should set aria attributes and roles on tab when tabId is given", () => {
    const mockProps = {
      defaultValue: "home",
      tabId: "test",
    };
    renderTabsContextComponent(mockProps);
    const tabListElement = screen.getByRole("tablist");
    expect(tabListElement).toBeVisible();
    const tabElements = within(tabListElement).getAllByRole("tab");
    expect(tabElements).toHaveLength(3);
    tabElements.forEach((tabElement, index) => {
      if (index === 0) {
        expect(tabElement).toHaveAttribute("aria-selected", "true");
      } else {
        expect(tabElement).toHaveAttribute("aria-selected", "false");
      }
      if (index === 0) {
        expect(tabElement).toHaveAttribute("id", `${mockProps.tabId}-tab-home`);
        expect(tabElement).toHaveAttribute("aria-controls", `${mockProps.tabId}-tabpanel-home`);
      } else if (index === 1) {
        expect(tabElement).toHaveAttribute("id", `${mockProps.tabId}-tab-profile`);
        expect(tabElement).toHaveAttribute("aria-controls", `${mockProps.tabId}-tabpanel-profile`);
      } else if (index === 2) {
        expect(tabElement).toHaveAttribute("id", `${mockProps.tabId}-tab-settings`);
        expect(tabElement).toHaveAttribute("aria-controls", `${mockProps.tabId}-tabpanel-settings`);
      }
    });
    const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
    expect(tabPanels).toHaveLength(3);
    tabPanels.forEach((tabPanel, index) => {
      if (index === 0) {
        expect(tabPanel).toBeVisible();
      } else {
        expect(tabPanel).not.toBeVisible();
      }
      if (index === 0) {
        expect(tabPanel).toHaveAttribute("id", `${mockProps.tabId}-tabpanel-home`);
        expect(tabPanel).toHaveAttribute("aria-labelledby", `${mockProps.tabId}-tab-home`);
      } else if (index === 1) {
        expect(tabPanel).toHaveAttribute("id", `${mockProps.tabId}-tabpanel-profile`);
        expect(tabPanel).toHaveAttribute("aria-labelledby", `${mockProps.tabId}-tab-profile`);
      } else if (index === 2) {
        expect(tabPanel).toHaveAttribute("id", `${mockProps.tabId}-tabpanel-settings`);
        expect(tabPanel).toHaveAttribute("aria-labelledby", `${mockProps.tabId}-tab-settings`);
      }
    });
  });

  describe("keyboard interactions", () => {
    it("should have single tabstop for tabs", async () => {
      const mockProps = {
        defaultValue: "home",
        onChange: vi.fn(),
      };
      renderTabsContextComponent(mockProps);
      const tabListElement = screen.getByRole("tablist");
      expect(tabListElement).toBeVisible();
      const tabElements = within(tabListElement).getAllByRole("tab");
      expect(tabElements).toHaveLength(3);
      tabElements.forEach((tabElement, index) => {
        if (index === 0) {
          expect(tabElement).toHaveAttribute("aria-selected", "true");
        } else {
          expect(tabElement).toHaveAttribute("aria-selected", "false");
        }
      });
      const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
      expect(tabPanels).toHaveLength(3);
      tabPanels.forEach((tabPanel, index) => {
        if (index === 0) {
          expect(tabPanel).toBeVisible();
        } else {
          expect(tabPanel).not.toBeVisible();
        }
      });
      expect(tabElements[0]).not.toHaveFocus();
      await userEvent.tab();
      expect(tabElements[0]).toHaveFocus();
      await userEvent.tab();
      expect(tabPanels[0]).toHaveFocus();
      await userEvent.tab({ shift: true });
      expect(tabElements[0]).toHaveFocus();
      await userEvent.tab({ shift: true });
      expect(tabElements[0]).not.toHaveFocus();
    });

    it("should able to navigate tabs with ArrowRight key", async () => {
      const mockProps = {
        defaultValue: "home",
        onChange: vi.fn(),
      };
      renderTabsContextComponent(mockProps);
      const tabListElement = screen.getByRole("tablist");
      expect(tabListElement).toBeVisible();
      const tabElements = within(tabListElement).getAllByRole("tab");
      expect(tabElements).toHaveLength(3);
      tabElements.forEach((tabElement, index) => {
        if (index === 0) {
          expect(tabElement).toHaveAttribute("aria-selected", "true");
        } else {
          expect(tabElement).toHaveAttribute("aria-selected", "false");
        }
      });
      const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
      expect(tabPanels).toHaveLength(3);
      tabPanels.forEach((tabPanel, index) => {
        if (index === 0) {
          expect(tabPanel).toBeVisible();
        } else {
          expect(tabPanel).not.toBeVisible();
        }
      });
      expect(tabElements[0]).not.toHaveFocus();
      await userEvent.tab();
      expect(tabElements[0]).toHaveFocus();
      await userEvent.keyboard("{ArrowRight}");
      expect(tabElements[1]).toHaveFocus();
      expect(tabElements[0]).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{ArrowRight}");
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[0]).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{ArrowRight}");
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).toHaveAttribute("aria-selected", "true");
    });

    it("should able to navigate tabs with ArrowLeft key", async () => {
      const mockProps = {
        defaultValue: "home",
        onChange: vi.fn(),
      };
      renderTabsContextComponent(mockProps);
      const tabListElement = screen.getByRole("tablist");
      expect(tabListElement).toBeVisible();
      const tabElements = within(tabListElement).getAllByRole("tab");
      expect(tabElements).toHaveLength(3);
      tabElements.forEach((tabElement, index) => {
        if (index === 0) {
          expect(tabElement).toHaveAttribute("aria-selected", "true");
        } else {
          expect(tabElement).toHaveAttribute("aria-selected", "false");
        }
      });
      const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
      expect(tabPanels).toHaveLength(3);
      tabPanels.forEach((tabPanel, index) => {
        if (index === 0) {
          expect(tabPanel).toBeVisible();
        } else {
          expect(tabPanel).not.toBeVisible();
        }
      });
      expect(tabElements[0]).not.toHaveFocus();
      await userEvent.tab();
      expect(tabElements[0]).toHaveFocus();
      await userEvent.keyboard("{ArrowLeft}");
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[0]).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{ArrowLeft}");
      expect(tabElements[1]).toHaveFocus();
      expect(tabElements[0]).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{ArrowLeft}");
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).toHaveAttribute("aria-selected", "true");
    });

    it("should able to navigate tabs with Home key", async () => {
      const mockProps = {
        defaultValue: "settings",
        onChange: vi.fn(),
      };
      renderTabsContextComponent(mockProps);
      const tabListElement = screen.getByRole("tablist");
      expect(tabListElement).toBeVisible();
      const tabElements = within(tabListElement).getAllByRole("tab");
      expect(tabElements).toHaveLength(3);
      tabElements.forEach((tabElement, index) => {
        if (index === 2) {
          expect(tabElement).toHaveAttribute("aria-selected", "true");
        } else {
          expect(tabElement).toHaveAttribute("aria-selected", "false");
        }
      });
      const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
      expect(tabPanels).toHaveLength(3);
      tabPanels.forEach((tabPanel, index) => {
        if (index === 2) {
          expect(tabPanel).toBeVisible();
        } else {
          expect(tabPanel).not.toBeVisible();
        }
      });
      expect(tabElements[0]).not.toHaveFocus();
      await userEvent.tab();
      expect(tabElements[2]).toHaveFocus();
      await userEvent.keyboard("{Home}");
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[2]).toHaveAttribute("aria-selected", "true");
    });

    it("should able to navigate tabs with End key", async () => {
      const mockProps = {
        defaultValue: "home",
        onChange: vi.fn(),
      };
      renderTabsContextComponent(mockProps);
      const tabListElement = screen.getByRole("tablist");
      expect(tabListElement).toBeVisible();
      const tabElements = within(tabListElement).getAllByRole("tab");
      expect(tabElements).toHaveLength(3);
      tabElements.forEach((tabElement, index) => {
        if (index === 0) {
          expect(tabElement).toHaveAttribute("aria-selected", "true");
        } else {
          expect(tabElement).toHaveAttribute("aria-selected", "false");
        }
      });
      const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });
      expect(tabPanels).toHaveLength(3);
      tabPanels.forEach((tabPanel, index) => {
        if (index === 0) {
          expect(tabPanel).toBeVisible();
        } else {
          expect(tabPanel).not.toBeVisible();
        }
      });
      expect(tabElements[0]).not.toHaveFocus();
      await userEvent.tab();
      expect(tabElements[0]).toHaveFocus();
      await userEvent.keyboard("{End}");
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[0]).toHaveAttribute("aria-selected", "true");
    });
  });
});