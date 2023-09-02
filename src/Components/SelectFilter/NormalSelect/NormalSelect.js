import React, { useContext } from "react";
import SelectFilterContext from "../SelectContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function NormalSelect({ data, option, style, select, disabled }) {
  const {
    setShow,
    setDataFilter,
    inputRef,
    prevInputValue,
    selectedOptionText,
  } = useContext(SelectFilterContext);

  const InputStyle = `
  ${select.IsClosed() && select.HasData() ? "cursor-pointer" : ""} 
  ${select.HasNoData() ? "bg-gray-300" : "bg-gray-50"} 
  border-y border-x border-gray-300 text-gray-900 text-sm rounded-lg  block w-full
  ${style === "big" ? "p-2.5" : "p-1.5"}
  `;

  const iconButtonStyle = {
    "&:hover": {
      backgroundColor: "transparent", // Establece el fondo en transparente
      boxShadow: "none", // Elimina la sombra
    },
    cursor: "auto",
  };
  const iconButtonStyleEmpty = {};
  return (
    <button
      disabled={select.HasNoData() || disabled}
      onClick={() => {
        if (select.HasData() && select.IsClosed()) {
          select.OpenDropdown();
        }
      }}
      className={InputStyle}
    >
      <div className="flex justify-between items-center">
        <label>
          {selectedOptionText.current
            ? selectedOptionText.current
            : "Seleccionar"}
        </label>
        {select.IsOpened() ? (
          <KeyboardArrowUpIcon
            style={select.HasNoData() ? iconButtonStyle : iconButtonStyleEmpty}
          />
        ) : (
          <KeyboardArrowDownIcon
            style={select.HasNoData() ? iconButtonStyle : iconButtonStyleEmpty}
          />
        )}
      </div>
    </button>
  );
}

export default NormalSelect;
