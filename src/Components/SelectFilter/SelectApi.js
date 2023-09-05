// import {
//   print,
//   printEnd,
//   printCollapsed,
// } from "../../../../../../utils/consoleToPrint";
import { useContext, useEffect, useState } from "react";
// import { distinct } from "../../../../../../utils/helpers";
// import GruposHorariosDocentesContext from "../../../../../../context/GrupoHorariosDocentesProvider";
// import NewGroupFormContext from "../../../NewGroupFormContext";
import SelectFilterContext from "./SelectContext";

export const SelectApi = (data, option, selected, onInputChange) => {
  const {
    show,
    setShow,
    dataFilter,
    setDataFilter,
    width,
    setWidth,
    inputRef,
    // prevDataRef,
    prevSelectedRef,
    prevInputValue,
  } = useContext(SelectFilterContext);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  // const toggleScroll = () => {
  //   setScrollEnabled(!scrollEnabled);
  // };

  useEffect(() => {
    document.body.style.overflowY = scrollEnabled ? "auto" : "hidden";
  }, [scrollEnabled]);

  // ****************************************************************************
  // CAMBIO DE SELECCIÓN
  // ****************************************************************************
  //   const handleOnSelectedChange = () => {
  //     if (Object.keys(selected).length === 0) {
  //       //   print("F");
  //       inputRef.current.value = "";
  //     } else {
  //       //   print("FF");
  //       inputRef.current.value =
  //         typeof option !== "string"
  //           ? ArrayOption(selected, option)
  //           : selected[option];
  //       prevInputValue.current =
  //         typeof option !== "string"
  //           ? ArrayOption(selected, option)
  //           : selected[option];
  //       //   print(inputRef.current.value);
  //       if (prevSelectedRef.current !== undefined) {
  //         onChange();
  //       }
  //     }
  //     prevSelectedRef.current = selected;
  //   };

  //   useEffect(() => {
  //     // print("selected " + label);
  //     // print(selected);
  //     handleOnSelectedChange();
  //   }, [selected]);

  // ****************************************************************************
  // const ArrayOption = (v, option) => {
  //   let optionReturned = "";
  //   for (let x in option) {
  //     optionReturned = optionReturned + v[option[x]];

  //     if (x != option.length - 1) {
  //       optionReturned = optionReturned + " - ";
  //     }
  //   }
  //   return optionReturned;
  // };

  // const selectOption = () => {
  //   inputRef.current.value =
  //     typeof option !== "string" ? ArrayOption(v, option) : v[option];
  //   prevInputValue.current = inputRef.current.value;
  // };
  // const previousValueExists = () => {
  //   return prevDataRef.current !== undefined;
  // };

  const HasInputChange = () => {
    return typeof onInputChange === "function";
  };

  const clearPreviousValue = () => {
    prevInputValue.current = "";
  };

  const handleOpenClose = () => {
    if (IsClosed()) {
      OpenDropdown();
    }
    if (IsOpened()) {
      CloseDropdown();
    }
  };

  const OpenDropdown = () => {
    if (inputRef.current !== undefined) {
      inputRef.current.value = "";
    }
    setScrollEnabled(false);
    setShow(true);
  };

  const CloseDropdown = () => {
    setScrollEnabled(true);
    if (inputRef.current !== undefined) {
      inputRef.current.value =
        prevInputValue.current == undefined ? "" : prevInputValue.current;
    }
    setShow(false);
    setDataFilter([]);
  };

  const IsClosed = () => {
    return !show;
  };

  const IsOpened = () => {
    return show;
  };

  const HasNoData = () => {
    return data.length === 0;
  };

  const HasData = () => {
    return data.length !== 0;
  };

  return {
    // selectOption,
    clearPreviousValue,
    handleOpenClose,
    OpenDropdown,

    CloseDropdown,
    //Boolean Values
    IsClosed,
    IsOpened,
    HasNoData,
    HasData,
    HasInputChange,
    // previousValueExists,
  };
};
