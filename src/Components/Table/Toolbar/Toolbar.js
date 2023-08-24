import React from "react";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

function Toolbar({ numSelected, toolbar, data, settings }) {
  return (
    <div
      className="w-full py-2 px-4 flex justify-between items-center gap-2 primary_color rounded-t-lg border-b-2"
      //   sx={{
      //     backgroundColor: toolbar?.color ? toolbar?.color : "white",
      //     // display: "flex",
      //     // ...(numSelected > 0 && {
      //     //   bgcolor: (theme) =>
      //     //     alpha(
      //     //       theme.palette.primary.main,
      //     //       theme.palette.action.activatedOpacity
      //     //     ),
      //     // }),
      //   }}
    >
      {/* **** TITULO **** */}

      <label className=" text-base  text-white">
        {toolbar?.title?.toUpperCase()}
      </label>

      {/* **** FILTRO **** */}

      {/* <div className="">
        <Tooltip title="Aplicar Filtros">
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
  );
}

export default Toolbar;
