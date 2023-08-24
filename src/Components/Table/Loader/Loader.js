import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function Loader({ data }) {
  return (
    <TableRow>
      <TableCell align={"center"} colSpan={data?.header?.length + 1}>
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default Loader;
