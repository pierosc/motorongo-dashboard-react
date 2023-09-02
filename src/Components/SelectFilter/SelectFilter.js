import React from "react";
import "./CustomSelectFilter.css";
import { SelectFilterProvider } from "./SelectContext";
import SelectFilterComponent from "./SelectFilter/SelectFilter";
// import { SelectApi } from "./SelectApi";

function SelectFilter({
  data = [],
  option,
  mapKey,
  selected = {},
  setSelected,
  label = "",
  style,
  onChange,
  onInputChange,
  start = "",
  defaultValue = "",
  disabled = false,
  mode = "searcheable",
}) {
  return (
    <SelectFilterProvider>
      <SelectFilterComponent
        data={data}
        option={option}
        mapKey={mapKey}
        selected={selected}
        setSelected={setSelected}
        label={label}
        style={style}
        onChange={onChange}
        onInputChange={onInputChange}
        start={start}
        disabled={disabled}
        mode={mode}
        // select={select}
      />
    </SelectFilterProvider>
  );
}

export default SelectFilter;
