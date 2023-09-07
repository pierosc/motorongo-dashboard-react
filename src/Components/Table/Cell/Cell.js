import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import { labelColor } from "../Styles/Styles";

function Cell({ settings, row, data, index, isItemSelected }) {
  const [cellValue, setCellValue] = useState(row[data.id]);

  return (
    <TableCell
      key={index}
      align={
        data?.dataAlign
          ? data?.dataAlign
          : settings?.body[0]?.align
          ? settings?.body[0]?.align
          : "center"
      }
      padding={
        settings?.body[0]?.padding ? settings?.body[0]?.padding : "normal"
      }
      sx={{
        color: isItemSelected
          ? labelColor("selected", settings)
          : labelColor("normal", settings),
        "&:hover": {
          color: isItemSelected
            ? labelColor("selected-hover", settings)
            : labelColor("hover", settings),
        },
      }}
    >
      {/* <CustomInput
        label=""
        value={cellValue}
        onChange={(e) => setCellValue(e.target.value)}
        style={"standard"}
        validationType="numeric"
      /> */}
      {data?.replaceData?.[row[data.id]]
        ? data?.replaceData?.[row[data.id]]
        : row[data.id]}
      {/* {row[data.id]} */}
    </TableCell>
  );
}

export default Cell;
