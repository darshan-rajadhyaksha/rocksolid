import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import TableHead from "@/components/TableHead";
import TableBody from "@/components/TableBody";
import TableCell, { type TableCellProps } from "@/components/TableCell";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const aligns = [
  "left",
  "center",
  "right",
  "justify",
] as const;

const renderTableCellComponent = (
  props?: TableCellProps,
) => {
  return render(() => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            {...props}
          >
            ID
          </TableCell>
          <TableCell
            {...props}
          >
            Name
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell
            {...props}
          >
            1
          </TableCell>
          <TableCell
            {...props}
          >
            Alex
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ));
};

describe("TableCell component", () => {
  it("should render the table cell", () => {
    renderTableCellComponent();
    const tableHeadCellElements = screen.getAllByRole("columnheader");
    expect(tableHeadCellElements).toHaveLength(2);
    tableHeadCellElements.forEach((tableHeadCell) => {
      expect(tableHeadCell).toBeVisible();
      expect(tableHeadCell.tagName.toLowerCase()).toBe("th");
      expect(tableHeadCell).toHaveClass(
        "text-inherit",
        "text-left",
        "align-[inherit]",
        theme.divider,
      );
    });
    const tableBodyCellElements = screen.getAllByRole("cell");
    expect(tableBodyCellElements).toHaveLength(2);
    tableBodyCellElements.forEach((tableBodyCell) => {
      expect(tableBodyCell).toBeVisible();
      expect(tableBodyCell.tagName.toLowerCase()).toBe("td");
      expect(tableBodyCell).toHaveClass(
        "text-inherit",
        "text-left",
        "align-[inherit]",
        theme.divider,
      );
    });
  });

  /** align prop */
  aligns.forEach((align) => {
    it(`should display table cell with ${align} align`, () => {
      renderTableCellComponent({ align });
      const tableHeadCellElements = screen.getAllByRole("columnheader");
      expect(tableHeadCellElements).toHaveLength(2);
      const alignClassMap = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      };
      tableHeadCellElements.forEach((tableHeadCell) => {
        expect(tableHeadCell).toBeVisible();
        expect(tableHeadCell).toHaveClass(alignClassMap[align]);
      });
      const tableBodyCellElements = screen.getAllByRole("cell");
      expect(tableBodyCellElements).toHaveLength(2);
      tableBodyCellElements.forEach((tableBodyCell) => {
        expect(tableBodyCell).toBeVisible();
        expect(tableBodyCell).toHaveClass(alignClassMap[align]);
      });
    });
  });

  /** as prop */
  it("should display all cells with th tag", () => {
    const mockProps = {
      as: "th" as const,
    };
    renderTableCellComponent(mockProps);
    const tableHeadCellElements = screen.queryAllByRole("columnheader");
    expect(tableHeadCellElements).toHaveLength(4);
    const tableBodyCellElements = screen.queryAllByRole("cell");
    expect(tableBodyCellElements).toHaveLength(0);
    tableHeadCellElements.forEach((tableHeadCell) => {
      expect(tableHeadCell.tagName.toLowerCase()).toBe("th");
    });
  });

  /** class prop */
  it("should apply custom class to table cell element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTableCellComponent(mockProps);
    const tableHeadCellElements = screen.getAllByRole("columnheader");
    tableHeadCellElements.forEach((tableHeadCell) => {
      expect(tableHeadCell).toBeVisible();
      expect(tableHeadCell).toHaveClass(mockProps.class);
    });
    const tableBodyCellElements = screen.getAllByRole("cell");
    tableBodyCellElements.forEach((tableBodyCell) => {
      expect(tableBodyCell).toBeVisible();
      expect(tableBodyCell).toHaveClass(mockProps.class);
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "border-zinc-500";
    const theme = createTheme({
      divider: customClass,
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>
    ));
    const tableCellElement = screen.getByRole("cell");
    expect(tableCellElement).toBeVisible();
    expect(tableCellElement).toHaveClass(customClass);
  });
});