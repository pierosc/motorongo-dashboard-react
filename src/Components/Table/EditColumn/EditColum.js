import React from "react";
import TableCell from "@mui/material/TableCell";
import { labelColor } from "../Styles/Styles";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

function EditColum({ settings, row, isItemSelected, setEditSelected }) {
  const handleEditSelection = (name) => {
    setEditSelected(name);
  };

  return (
    <TableCell
      align={"center"}
      padding={
        settings?.body[0]?.padding ? settings?.body[0]?.padding : "normal"
      }
    >
      <IconButton
        disabled={settings?.body[0]?.editColumn[0]?.disabled}
        onClick={() => {
          handleEditSelection(row);
          if (settings?.body[0]?.editColumn[0]?.function) {
            settings?.body[0]?.editColumn[0]?.function();
          }
          //   settings?.body[0]?.editColumn[0]?.function
          //     ? settings?.body[0]?.editColumn[0]?.function()
          //     : print("No function asigned to the edit button");
        }}
        sx={{
          color: isItemSelected
            ? labelColor("selected", settings)
            : labelColor("normal", settings),
        }}
      >
        <EditIcon />
      </IconButton>
    </TableCell>
  );
}

export default EditColum;
