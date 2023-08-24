import React from "react";
import TableCell from "@mui/material/TableCell";
import { labelColor } from "../Styles/Styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteColumn({ settings, row, isItemSelected, setDeleteSelected }) {
  const handleDeleteSelection = (name) => {
    setDeleteSelected(name);
  };

  return (
    <TableCell
      align={"center"}
      padding={
        settings?.body[0]?.padding ? settings?.body[0]?.padding : "normal"
      }
    >
      <IconButton
        disabled={settings?.body[0]?.deleteColumn[0]?.disabled}
        onClick={() => {
          handleDeleteSelection(row);
          if (settings?.body[0]?.deleteColumn[0]?.function) {
            settings?.body[0]?.deleteColumn[0]?.function();
          }
        }}
        sx={{
          color: isItemSelected
            ? labelColor("selected", settings)
            : labelColor("normal", settings),
        }}
      >
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
}

export default DeleteColumn;
