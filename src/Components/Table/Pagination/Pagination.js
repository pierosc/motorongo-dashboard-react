import React from "react";
import TablePagination from "@mui/material/TablePagination";

function Pagination({
  settings,
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      sx={{
        backgroundColor: settings?.pagination[0]?.color
          ? settings?.pagination[0]?.color
          : "white",
        color: settings?.pagination[0]?.labelColor
          ? settings?.pagination[0]?.labelColor
          : "rgba(0, 0, 0, 0.87)",
      }}
      labelRowsPerPage={settings?.pagination[0]?.label}
      rowsPerPageOptions={
        settings?.pagination[0]?.rowsPerPageOptions
          ? settings?.pagination[0]?.rowsPerPageOptions
          : [5, 10, 25]
      }
      component="div"
      count={data?.data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default Pagination;
