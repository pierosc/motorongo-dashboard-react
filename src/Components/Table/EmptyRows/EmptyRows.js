import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function EmptyRows({ settings, data, rowsPerPage, page }) {
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.data.length) : 0;

  return emptyRows > 0 ? (
    <TableRow
      style={{
        height: (settings?.dense === "small" ? 33 : 53) * emptyRows,
      }}
    >
      <TableCell colSpan={6} />
    </TableRow>
  ) : null;
}

export default EmptyRows;
