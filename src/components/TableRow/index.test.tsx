import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Table from "@/components/Table";
import TableRow, { type TableRowProps } from "@/components/TableRow";
import TableBody from "@/components/TableBody";
import TableCell from "@/components/TableCell";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderTableRowComponent = (
  props?: TableRowProps
) => {
  return render(() => (
    <Table>
      <TableBody>
        <TableRow
          {...props}
        >
          <TableCell>1</TableCell>
          <TableCell>Alex</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ));
};

describe("TableRow component", () => {
  it("should render the table row", () => {
    renderTableRowComponent();
    const tableRowElement = screen.getByRole("row");
    expect(tableRowElement).toBeVisible();
    expect(tableRowElement).toHaveClass(
      "text-inherit",
      "align-middle",
      "[&_th]:border-b",
      "[&:not(:last-child)>td]:border-b",
    );
  });

  /** class prop */
  it("should apply custom class to table row element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTableRowComponent(mockProps);
    const tableRowElement = screen.getByRole("row");
    expect(tableRowElement).toBeVisible();
    expect(tableRowElement).toHaveClass(mockProps.class);
  });

  /** selected prop */
  it("should not display selected table row", () => {
    const mockProps = {
      selected: false,
    };
    renderTableRowComponent(mockProps);
    const tableRowElement = screen.getByRole("row");
    expect(tableRowElement).toBeVisible();
    expect(tableRowElement).toHaveAttribute("aria-selected", "false");
    expect(tableRowElement).not.toHaveClass(
      theme.colors.default.filled.background,
    );
  });

  it("should display selected table row", () => {
    const mockProps = {
      selected: true,
    };
    renderTableRowComponent(mockProps);
    const tableRowElement = screen.getByRole("row");
    expect(tableRowElement).toBeVisible();
    expect(tableRowElement).toHaveAttribute("aria-selected", "true");
    expect(tableRowElement).toHaveClass(
      theme.colors.default.filled.background,
    );
  });

  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "bg-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          filled: {
            background: customClass,
          },
        },
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Table>
          <TableBody>
            <TableRow
              selected
            >
              <TableCell>1</TableCell>
              <TableCell>Alex</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>
    ));
    const tableRowElement = screen.getByRole("row");
    expect(tableRowElement).toBeVisible();
    expect(tableRowElement).toHaveClass(customClass);
  });
});