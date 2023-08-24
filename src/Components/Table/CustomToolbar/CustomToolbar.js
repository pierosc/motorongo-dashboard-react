import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
function CustomToolbar({ numSelected, toolbar, data, settings }) {
  return (
    <TableRow
      sx={{
        backgroundColor: toolbar?.color ? toolbar?.color : "white",
        // display: "flex",
        // ...(numSelected > 0 && {
        //   bgcolor: (theme) =>
        //     alpha(
        //       theme.palette.primary.main,
        //       theme.palette.action.activatedOpacity
        //     ),
        // }),
      }}
    >
      <TableCell
        sx={{
          color: toolbar?.labelColor ? toolbar?.labelColor : "white",
          backgroundColor: toolbar?.color ? toolbar?.color : "rgb(48,142,33)",
        }}
        colSpan={
          data?.header?.length +
          (settings?.header[0]?.checkbox ? 1 : 1) +
          (settings?.body[0]?.editColumn ? 1 : 0) +
          (settings?.body[0]?.deleteColumn ? 1 : 0)
        }
      >
        <div className=" flex justify-center items-center w-full gap-2">
          <div className="justify-self-start">
            <label className=" text-base font-normal ">{toolbar?.title}</label>
          </div>
          {/* <div className="justify-self-end">
            <Tooltip title="Filter list">
              <IconButton
                sx={{
                  color: toolbar?.labelColor ? toolbar?.labelColor : "black",
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </div> */}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default CustomToolbar;
