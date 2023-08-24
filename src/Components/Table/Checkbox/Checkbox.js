import React from "react";
import TableCell from "@mui/material/TableCell";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";

function CustomCheckbox({
  settings,
  data,
  row,
  index,
  isItemSelected,
  selected,
  setSelected,
}) {
  const handleClick = (event, name, index) => {
    let newSelected = [];

    if (settings?.selectionType == "single") {
      newSelected = newSelected.concat(name);
    } else if (settings?.selectionType == "singleObject") {
      newSelected = name;
    } else if (settings?.selectionType == "singleToggle") {
      newSelected = JSON.stringify(selected).includes(JSON.stringify(name))
        ? []
        : newSelected.concat(name);
    } else if (settings?.selectionType == "multi") {
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

  return (
    <TableCell padding="checkbox">
      <ThemeProvider
        theme={createTheme({
          palette: {
            neutral: {
              main: settings?.body[0]?.labelSelectedColor
                ? settings?.body[0]?.labelSelectedColor
                : "#1976d2",
            },
          },
        })}
      >
        {!settings?.body[0]?.checkboxType ||
        settings?.body[0]?.checkboxType == "checkbox" ||
        settings?.body[0]?.checkboxType != "radio" ? (
          <Checkbox
            color="neutral"
            checked={isItemSelected}
            sx={{
              color: settings?.body[0]?.labelColor
                ? settings?.body[0]?.labelColor
                : "rgba(0, 0, 0, 0.87)",
            }}
            onClick={
              settings?.body[0]?.editColumn || settings?.body[0]?.deleteColumn
                ? (event) => {
                    handleClick(event, row, index);
                  }
                : () => {}
            }
          />
        ) : (
          <Radio
            color="neutral"
            checked={isItemSelected}
            sx={{
              color: settings?.body[0]?.labelColor
                ? settings?.body[0]?.labelColor
                : "rgba(0, 0, 0, 0.87)",
            }}
            onClick={
              settings?.body[0]?.editColumn || settings?.body[0]?.deleteColumn
                ? (event) => {
                    handleClick(event, row, index);
                  }
                : () => {}
            }
          />
        )}
      </ThemeProvider>
    </TableCell>
  );
}

export default CustomCheckbox;
