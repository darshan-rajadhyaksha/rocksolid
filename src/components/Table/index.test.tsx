import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Table, { type TableProps } from "@/components/Table";
import TableHead from "@/components/TableHead";
import TableRow from "@/components/TableRow";
import TableBody from "@/components/TableBody";
import TableCell from "@/components/TableCell";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderTableComponent = (
  props?: TableProps
) => {
  return render(() => (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Alex</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Alice</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ));
};

describe("Table component", () => {
  it("should render the table", () => {
    renderTableComponent();
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeVisible();
    expect(tableElement).toHaveClass(
      "w-full",
      "border-collapse",
      "border-spacing-0",
      "text-sm",
      theme.typography.colors.textPrimary,
    );
  });

  /** class prop */
  it("should apply custom class to table element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTableComponent(mockProps);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeVisible();
    expect(tableElement).toHaveClass(mockProps.class);
  });

  /** dense prop */
  it("should not display densed table", () => {
    const mockProps = {
      dense: false,
    };
    renderTableComponent(mockProps);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeVisible();
    const tableCells = within(tableElement).getAllByRole("cell");
    const tableHeadCells = within(tableElement).getAllByRole("columnheader");
    [
      ...tableHeadCells,
      ...tableCells,
    ].forEach((tableCell) => {
      expect(tableCell).toHaveClass(
        "py-3",
        "px-3.5",
      );
    });
  });

  it("should display densed table", () => {
    const mockProps = {
      dense: true,
    };
    renderTableComponent(mockProps);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeVisible();
    const tableCells = within(tableElement).getAllByRole("cell");
    tableCells.forEach((tableCell) => {
      expect(tableCell).toHaveClass(
        "py-1.5",
        "px-2",
      );
    });
  });

  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "rounded-[2px]";
    const theme = createTheme({
      typography: {
        colors: {
          textPrimary: customClass,
        },
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Table />
      </ThemeProvider>
    ));
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeVisible();
    expect(tableElement).toHaveClass(customClass);
  });
});