import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function DropButton({ select, disabled }) {
  const iconButtonStyle = {
    "&:hover": {
      backgroundColor: "transparent", // Establece el fondo en transparente
      boxShadow: "none", // Elimina la sombra
    },
    cursor: !disabled ? "auto" : "default",
  };
  const iconButtonStyleEmpty = {};

  const buttonStyle = `${
    select.HasNoData() || disabled
      ? "bg-gray-300 default text-gray-400"
      : select.IsOpened()
      ? "bg-gray-200 border-l color-900"
      : "bg-gray-50 color-900"
  } border-y border-r border-gray-300  text-base rounded-r-lg `;

  return (
    <button
      onClick={() => {
        select.handleOpenClose();
      }}
      disabled={select.HasNoData() || disabled}
      style={select.HasNoData() ? iconButtonStyle : iconButtonStyleEmpty}
      className={buttonStyle}
    >
      <div disabled={true}>
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

export default DropButton;
