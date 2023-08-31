import React, { useContext } from "react";
import SelectFilterContext from "../SelectContext";

function SearchInput({ data, option, style, select, disabled, onInputChange }) {
  const { setDataFilter, inputRef } = useContext(SelectFilterContext);

  const filterFunction = () => {
    setDataFilter(
      data.filter((v) =>
        v[option].toUpperCase().includes(inputRef?.current?.value.toUpperCase())
      )
    );
  };

  const InputStyle = `
${select.IsClosed() && select.HasData() && !disabled ? "cursor-pointer" : ""} ${
    (select.HasNoData() && !select.HasInputChange()) || disabled
      ? "bg-gray-300"
      : "bg-gray-50"
  } border-y border-l border-gray-300 text-gray-900 text-sm rounded-l-lg  block w-full
${style === "big" ? "p-2.5" : "p-1.5"}
`;

  return (
    <input
      ref={inputRef}
      disabled={(select.HasNoData() && !select.HasInputChange()) || disabled}
      placeholder={
        select.IsOpened() || select.HasInputChange()
          ? "Buscar 🔎"
          : "Seleccionar"
      }
      onClick={() => {
        if (
          (select.HasData() || select.HasInputChange()) &&
          select.IsClosed()
        ) {
          select.OpenDropdown();
        }
      }}
      onChange={() => {
        if (select.HasInputChange()) {
          onInputChange(inputRef?.current?.value);
          console.log("hola");
        } else {
          filterFunction();
        }
      }}
      className={InputStyle}
    ></input>
  );
}

export default SearchInput;
