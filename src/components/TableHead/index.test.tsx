import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Table from "@/components/Table";
import TableHead, { type TableHeadProps } from "@/components/TableHead";
import TableRow from "@/components/TableRow";
import TableCell from "@/components/TableCell";

const renderTableHeadComponent = (
  props?: TableHeadProps
) => {
  return render(() => (
    <Table>
      <TableHead
        {...props}
      >
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  ));
};

describe("TableHead component", () => {
  it("should render the table head", () => {
    renderTableHeadComponent();
    const tableHeadElement = screen.getByRole("rowgroup");
    expect(tableHeadElement).toBeVisible();
    expect(tableHeadElement.tagName.toLowerCase()).toBe("thead");
  });

  /** class prop */
  it("should apply custom class to table head element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTableHeadComponent(mockProps);
    const tableHeadElement = screen.getByRole("rowgroup");
    expect(tableHeadElement).toBeVisible();
    expect(tableHeadElement).toHaveClass(mockProps.class);
  });

  it("should have th as table cell inside table head", () => {
    renderTableHeadComponent();
    const tableHeadElement = screen.getByRole("rowgroup");
    expect(tableHeadElement).toBeVisible();
    const tableHeadCells = within(tableHeadElement).getAllByRole("columnheader");
    tableHeadCells.forEach((tableHeadCell) => {
      expect(tableHeadCell.tagName.toLowerCase()).toBe("th");
    });
  });
});