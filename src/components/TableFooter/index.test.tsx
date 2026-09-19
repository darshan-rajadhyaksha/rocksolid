import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Table from "@/components/Table";
import TableFooter, { type TableFooterProps } from "@/components/TableFooter";
import TableRow from "@/components/TableRow";
import TableCell from "@/components/TableCell";

const renderTableFooterComponent = (
  props?: TableFooterProps
) => {
  return render(() => (
    <Table>
      <TableFooter
        {...props}
      >
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ));
};

describe("TableFooter component", () => {
  it("should render the table footer", () => {
    renderTableFooterComponent();
    const tableFooterElement = screen.getByRole("rowgroup");
    expect(tableFooterElement).toBeVisible();
    expect(tableFooterElement.tagName.toLowerCase()).toBe("tfoot");
    expect(tableFooterElement).toHaveClass(
      "bg-neutral-100",
      "dark:bg-neutral-900",
    );
  });

  /** class prop */
  it("should apply custom class to table footer element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTableFooterComponent(mockProps);
    const tableFooterElement = screen.getByRole("rowgroup");
    expect(tableFooterElement).toBeVisible();
    expect(tableFooterElement).toHaveClass(mockProps.class);
  });

  it("should have td as table cell footer table footer", () => {
    renderTableFooterComponent();
    const tableFooterElement = screen.getByRole("rowgroup");
    expect(tableFooterElement).toBeVisible();
    const tableFooterCells = within(tableFooterElement).getAllByRole("cell");
    tableFooterCells.forEach((tableFooterCell) => {
      expect(tableFooterCell.tagName.toLowerCase()).toBe("td");
    });
  });
});