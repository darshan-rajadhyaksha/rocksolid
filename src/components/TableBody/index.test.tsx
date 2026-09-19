import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Table from "@/components/Table";
import TableBody, { type TableBodyProps } from "@/components/TableBody";
import TableRow from "@/components/TableRow";
import TableCell from "@/components/TableCell";

const renderTableBodyComponent = (
  props?: TableBodyProps
) => {
  return render(() => (
    <Table>
      <TableBody
        {...props}
      >
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ));
};

describe("TableBody component", () => {
  it("should render the table body", () => {
    renderTableBodyComponent();
    const tableBodyElement = screen.getByRole("rowgroup");
    expect(tableBodyElement).toBeVisible();
    expect(tableBodyElement.tagName.toLowerCase()).toBe("tbody");
  });

  /** class prop */
  it("should apply custom class to table body element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTableBodyComponent(mockProps);
    const tableBodyElement = screen.getByRole("rowgroup");
    expect(tableBodyElement).toBeVisible();
    expect(tableBodyElement).toHaveClass(mockProps.class);
  });

  it("should have td as table cell inside table body", () => {
    renderTableBodyComponent();
    const tableBodyElement = screen.getByRole("rowgroup");
    expect(tableBodyElement).toBeVisible();
    const tableBodyCells = within(tableBodyElement).getAllByRole("cell");
    tableBodyCells.forEach((tableBodyCell) => {
      expect(tableBodyCell.tagName.toLowerCase()).toBe("td");
    });
  });
});