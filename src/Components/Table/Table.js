import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import CustomHeader from "./CustomHeader/CustomHeader";
import Checkbox from "./Checkbox/Checkbox";
import Cell from "./Cell/Cell";
import EditColum from "./EditColumn/EditColum";
import DeleteColumn from "./DeleteColumn/DeleteColumn";
import Pagination from "./Pagination/Pagination";
import EmptyRows from "./EmptyRows/EmptyRows";
import Loader from "./Loader/Loader";
import { Row } from "./Row/Row";
import Header from "./Header/Header";
import Toolbar from "./Toolbar/Toolbar";
import FilterGroup from "../FilterGroup/FilterGroup";
import { v4 as uuidv4 } from "uuid";
import { useSessionStorage } from "../../../hooks/useStorage";
//**************************************************************************
//********************************* ORDER **********************************

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array?.map?.((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

//**************************************************************************
//******************************* TABLE BODY *******************************
//**************************************************************************

function Table({
  settings,
  data,
  selected,
  setSelected,
  setDeleteSelected,
  setEditSelected,
  loading = false,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const [filteredData, setFilteredData] = useState(data?.data);

  // const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    settings?.pagination
      ? settings?.pagination[0].rowsPerPageOptions
        ? settings?.pagination[0]?.rowsPerPageOptions[0]
        : 5
      : 5
  );

  //**************************************************************************
  //********************************* ORDER **********************************

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //**************************************************************************
  //******************************* SELECTION ********************************

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelected = data?.data.map((n) => n);
      const newSelected = filteredData?.map((n) => n);

      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // console.log(filteredData);
  return (
    <div className="flex flex-col">
      <FilterGroup
        data={data}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
      <Box sx={{ width: "100%", borderRadius: "10px" }}>
        <Paper
          elevation={settings?.elevation ? settings?.elevation : 0}
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          {/* <Header
          numSelected={selected?.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={data?.data?.length}
          //...

          toolbar={settings?.toolbar ? settings?.toolbar[0] : []}
          //...
          data={data}
          settings={settings}
        /> */}

          {settings?.toolbar ? (
            <Toolbar
              numSelected={selected?.length}
              toolbar={settings?.toolbar ? settings?.toolbar[0] : []}
              data={data}
              settings={settings}
            />
          ) : null}
          <TableContainer
            sx={{
              maxHeight: settings?.height ? settings?.height : "100%",
              borderTopLeftRadius: settings?.toolbar ? "0px" : "10px",
              borderTopRightRadius: settings?.toolbar ? "0px" : "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <Table
              stickyHeader
              size={
                settings?.dense === "small"
                  ? "small"
                  : settings?.dense === "medium"
                  ? "medium"
                  : "medium"
              }
            >
              {/* //***************************************************************************
            //**************************** HEADER & TOOLBAR ***************************** */}

              {settings?.header && (
                <CustomHeader
                  numSelected={selected?.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={filteredData?.length}
                  // rowCount={data?.data?.length}

                  //...

                  toolbar={settings?.toolbar ? settings?.toolbar[0] : []}
                  //...
                  data={data}
                  settings={settings}
                />
              )}

              {/* //***************************************************************************
            //********************************** BODY *********************************** */}

              <TableBody>
                {loading ? (
                  <Loader data={data} />
                ) : (
                  // stableSort(data?.data,
                  stableSort(
                    filteredData,

                    getComparator(order, orderBy)
                  )
                    ?.slice(
                      settings?.pagination !== undefined
                        ? page * rowsPerPage
                        : 0,
                      settings?.pagination !== undefined
                        ? page * rowsPerPage + rowsPerPage
                        : filteredData?.length

                      // : data?.data.length
                    )
                    .map((row, index) => {
                      const isItemSelected = JSON.stringify(selected).includes(
                        JSON.stringify(row)
                      );

                      return (
                        <Row
                          key={index}
                          settings={settings}
                          data={data}
                          row={row}
                          isItemSelected={isItemSelected}
                          index={index}
                          selected={selected}
                          setSelected={setSelected}
                        >
                          {settings?.body[0]?.checkbox && (
                            <Checkbox
                              settings={settings}
                              data={data}
                              row={row}
                              index={index}
                              isItemSelected={isItemSelected}
                              selected={selected}
                              setSelected={setSelected}
                            />
                          )}
                          {/* //***************************************************************************
                       //********************************** ROWS *********************************** */}
                          {data?.header.map((data, index) => {
                            return (
                              <Cell
                                key={index}
                                settings={settings}
                                row={row}
                                data={data}
                                index={index}
                                isItemSelected={isItemSelected}
                              />
                            );
                          })}
                          {/* //***************************************************************************
                        //********************************** EDIT *********************************** */}
                          {settings?.body[0]?.editColumn && (
                            <EditColum
                              settings={settings}
                              row={row}
                              isItemSelected={isItemSelected}
                              setEditSelected={setEditSelected}
                            />
                          )}
                          {/* //***************************************************************************
                       //********************************* DELETE ********************************** */}
                          {settings?.body[0]?.deleteColumn && (
                            <DeleteColumn
                              settings={settings}
                              row={row}
                              isItemSelected={isItemSelected}
                              setDeleteSelected={setDeleteSelected}
                            />
                          )}
                        </Row>
                      );
                    })
                )}
                <EmptyRows
                  settings={settings}
                  data={data}
                  rowsPerPage={rowsPerPage}
                  page={page}
                />
              </TableBody>
            </Table>
          </TableContainer>

          {/* //***************************************************************************
        //******************************* PAGINATION ******************************** */}

          {settings?.pagination && (
            <Pagination
              settings={settings}
              data={data}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default Table;
