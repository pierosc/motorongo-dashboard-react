import React, { useState, useEffect, useRef } from "react";
import Filter from "../Filter/Filter";
import NumberFilter from "../Filter/NumberFilter";
import {
  print,
  printEnd,
  printGroup,
  printCollapsed,
} from "../../Utils/consoleToPrint";
import SelectFilter from "../Filter/SelectFilter";
import { useSessionStorage } from "../hooks/useStorage";
import { Button } from "@mui/material";

function FilterGroup({ data, filteredData, setFilteredData }) {
  const [initialDataForSelectFilter, setInitialDataForSelectFilter] = useState(
    data?.data
  );

  const preventFirstRender = useRef();

  useEffect(() => {
    setInitialDataForSelectFilter(data?.data);
  }, [data?.data]);

  useEffect(() => {
    if (preventFirstRender.current !== undefined) {
      clearAllFilters();
    }
    preventFirstRender.current = data?.data;
  }, [data?.data]);

  const allFilters = data?.header?.filter?.(
    (v) =>
      v?.filterType === "string" ||
      v?.filterType === "number" ||
      v?.filterType === "select"
  );

  const allIds = allFilters?.map?.((v) => v?.id);

  //CREAR VARIABLES VACIAS AL INICIAR
  let InitialFilterGroup;
  for (let x in allFilters) {
    InitialFilterGroup = {
      ...InitialFilterGroup,
      ["filter" + x]:
        allFilters[x]?.filterType === "string"
          ? ""
          : allFilters[x]?.filterType === "number"
          ? [0, 9999]
          : "",
    };
  }

  const clearAllFilters = () => {
    setFilterGroup(InitialFilterGroup);
  };

  // const [filterGroup, setFilterGroup] = useState(InitialFilterGroup);
  const [filterGroup, setFilterGroup] = useSessionStorage(
    data?.tableIdentifier ? data?.tableIdentifier : "",
    InitialFilterGroup
  );

  //TODO: mejorar perfomance a la hora de aplicar filtros

  useEffect(() => {
    // if (data?.data?.length !== 0) {
    printCollapsed("FILTROS");

    printGroup("Filtros a aplicar");
    print(filterGroup);
    printEnd();

    let filteredGroupData = data?.data;
    printGroup("Data de entrada");
    print(filteredGroupData);
    printEnd();

    for (let x in Object.keys(allFilters)) {
      printCollapsed("Filtro a evaluar: filter" + x);
      print("Campo del filtro: " + allIds[x]);
      printGroup("Data de entrada");
      print(filteredGroupData);
      printEnd();
      print(filterGroup["filter" + x]);
      print("Tipo del filtro: " + allFilters[x]?.filterType);

      filteredGroupData = filteredGroupData?.filter((v) =>
        allFilters[x]?.filterType === "string"
          ? v[allIds[x]]
              ?.toString()
              ?.toUpperCase()
              .includes(
                filterGroup["filter" + x]?.toString()?.toUpperCase() ===
                  undefined
                  ? ""
                  : filterGroup["filter" + x]?.toString()?.toUpperCase()
              )
          : allFilters[x]?.filterType === "number"
          ? Number(v[allIds[x]]) >= filterGroup["filter" + x]?.[0] &&
            Number(v[allIds[x]]) <= filterGroup["filter" + x]?.[1]
          : v[allIds[x]]
              ?.toString()
              ?.toUpperCase()
              .includes(
                filterGroup["filter" + x]?.toString()?.toUpperCase() ===
                  undefined
                  ? ""
                  : filterGroup["filter" + x]?.toString()?.toUpperCase()
              )
      );
      printGroup("Data de salida del filtro");
      print(filteredGroupData);
      printEnd();
      printEnd();
    }
    printGroup("Data de salida");
    print(filteredGroupData);
    printEnd();
    printEnd();

    setFilteredData(filteredGroupData);
    // }
  }, [filterGroup, data?.data]);

  return allFilters?.length > 0 ? (
    <div className="grid gap-2 grid-cols-4 mb-2 primary_color p-2 rounded-md">
      {allFilters?.map((v, index) =>
        v?.filterType === "string" ? (
          <Filter
            key={index}
            index={index}
            filterTitle={v?.label}
            filterGroup={filterGroup}
            setFilterGroup={setFilterGroup}
          />
        ) : v?.filterType === "number" ? (
          <NumberFilter
            key={index}
            index={index}
            filterTitle={v?.label}
            filterGroup={filterGroup}
            setFilterGroup={setFilterGroup}
          />
        ) : (
          <SelectFilter
            key={index}
            index={index}
            filterTitle={v?.label}
            filterCriteria={v?.id}
            filterGroup={filterGroup}
            setFilterGroup={setFilterGroup}
            filteredData={initialDataForSelectFilter}
          />
        )
      )}
      {/* <Button
        onClick={() => {
          clearAllFilters();
        }}
      /> */}
    </div>
  ) : (
    <></>
  );
}

export default FilterGroup;
