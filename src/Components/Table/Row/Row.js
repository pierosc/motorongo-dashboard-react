import React from "react";
import TableRow from "@mui/material/TableRow";

const rowColor = (status, settings) => {
  switch (status) {
    case "selected":
      return settings?.body[0]?.rowSelectedColor
        ? settings?.body[0]?.rowSelectedColor
        : "rgba(25, 118, 210, 0.08)"; //COLOR DE FILA SELECCIONADA POR DEFECTO
    case "normal":
      return settings?.body[0]?.rowColor
        ? settings?.body[0]?.rowColor
        : "rgb(255,255,255)"; //COLOR DE FILA POR DEFECTO
    case "selected-hover":
      return settings?.body[0]?.rowSelectedHoverColor
        ? settings?.body[0]?.rowSelectedHoverColor
        : "rgba(25, 118, 210, 0.12)"; //COLOR DE FILA SELECCIONADA CON HOVER POR DEFECTO
    case "hover":
      return settings?.body[0]?.rowHoverColor
        ? settings?.body[0]?.rowHoverColor
        : "rgba(0, 0, 0, 0.04)"; //COLOR DE FILA CON HOVER POR DEFECTO
    default:
      return "white";
  }
};

export const Row = ({
  settings,
  data,
  row,
  isItemSelected,
  index,
  children,
  selected,
  setSelected,
}) => {
  // const rowData = data[index];

  const handleClick = (event, name, index) => {
    let newSelected = [];

    if (settings?.selectionType === "single") {
      newSelected = newSelected.concat(name);
    } else if (settings?.selectionType === "singleObject") {
      newSelected = name;
    } else if (settings?.selectionType === "singleToggle") {
      newSelected = JSON.stringify(selected).includes(JSON.stringify(name))
        ? []
        : newSelected.concat(name);
    } else if (settings?.selectionType === "multi") {
      if (JSON.stringify(selected).includes(JSON.stringify(name))) {
        let index = selected.findIndex((object) => {
          return object[data?.dataKey] === name[data?.dataKey];
        });
        newSelected = selected
          .slice(0, index)
          .concat(selected.slice(index + 1, selected.length + 1));
      } else {
        newSelected = newSelected.concat(selected, name);
      }
    }

    setSelected(newSelected);
  };

  //*** ESTILO DE LA FILA ***

  const rowStyle = {
    backgroundColor: isItemSelected
      ? rowColor("selected", settings)
      : rowColor("normal", settings),

    "&:hover": {
      backgroundColor:
        settings?.selectionType !== "noSelection"
          ? isItemSelected
            ? rowColor("selected-hover", settings)
            : rowColor("hover", settings)
          : rowColor("normal", settings),

      cursor:
        settings?.selectionType !== "noSelection"
          ? !settings?.body[0]?.editColumn && !settings?.body[0]?.deleteColumn
            ? "pointer"
            : "auto"
          : "auto",
    },
  };

  return (
    <TableRow
      onClick={(event) => {
        if (settings?.selectionType !== "noSelection") {
          if (
            settings?.body[0]?.editColumn ||
            settings?.body[0]?.deleteColumn
          ) {
          } else {
            handleClick(event, row, index);
          }
        }
      }}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row[data?.dataKey]}
      sx={rowStyle}
    >
      {children}
    </TableRow>
  );
};
