import React, { useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  print,
  printGroup,
  printEnd,
  printCollapsed,
} from "./../../../utils/utils";

function SelectFilter({
  filterTitle,
  index,
  filterCriteria,
  setFilterGroup,
  filterGroup,
  filteredData,
}) {
  const selectRef = useRef();

  const filterkey = "filter" + index;

  const FilterData = debounce(() => {
    setFilterGroup({
      ...filterGroup,
      [filterkey]: selectRef?.current?.value,
    });
  }, 100);

  let list = [];
  // console.groupCollapsed("Comparación");
  for (let x in filteredData) {
    // print(
    //   filteredData[x]?.[filterTitle] +
    //     " con " +
    //     filteredData[parseInt(x) + 1]?.[filterTitle]
    // );
    if (
      filteredData[x]?.[filterCriteria] !==
      filteredData[parseInt(x) + 1]?.[filterCriteria]
    ) {
      list = list.concat(filteredData[x]?.[filterCriteria]);
    }
    // print(list);
  }
  // console.groupEnd();
  // console.groupCollapsed("Lista de Grupos filtrada");
  // print(list);
  // console.groupEnd();
  // console.groupEnd();

  //Setear valor con el guardado en el sessionStorage

  useEffect(() => {
    selectRef.current.value = filterGroup?.[filterkey];
  }, [filterGroup]);

  //************************************************* */

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white">
        {filterTitle}
      </label>
      <div className="flex ">
        <select
          ref={selectRef}
          defaultValue={""}
          required
          disabled={list?.length === 0}
          onChange={() => {
            FilterData();
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
        >
          <option value="" disabled hidden>
            Seleccione
          </option>
          {list?.map?.((v, index) => (
            <option key={index} value={v}>
              {v}
            </option>
          ))}
        </select>
        <div className="">
          <Tooltip title="Limpiar este Filtro">
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={() => {
                selectRef.current.value = "";
                setFilterGroup({
                  ...filterGroup,
                  [filterkey]: "",
                });
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default SelectFilter;
