import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from "react";
// import ClickAwayListener from "@mui/base/ClickAwayListener";
import SelectFilterContext from "../SelectContext";
import DropButton from "../DropButton/DropButton";
import Option from "../Option/Option";
import SearchInput from "../SearchInput/SearchInput";
import { SelectApi } from "../SelectApi";
import NormalSelect from "../NormalSelect/NormalSelect";
import useOnchange from "../../hooks/useOnChange";
import { dropdownContainer, labelText } from "../SelectStyle";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import { ClickAwayListener } from "@mui/material";

function SelectFilter({
  data = [],
  option,
  mapKey,
  selected = {},
  setSelected,
  label = "",
  mode,
  style,
  onChange = () => {},
  onInputChange,
  start = "", //para posicionamiento
  disabled,
}) {
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

  const select = SelectApi(data, option, selected, onInputChange);

  const dropdownContainerStyle = useRef(dropdownContainer);

  //*************** ON DATA CHANGE ***************

  const handleDataChange = () => {
    // if (prevDataRef.current !== undefined) {
    if (!select.HasInputChange()) {
      setSelected({});

      select.clearPreviousValue();
    }
    // }
    // prevDataRef.current = data;
  };

  useOnchange(() => {
    handleDataChange();
  }, [data]);

  //*************** ON SELECT CHANGE ***************

  const handleOnSelectedChange = () => {
    if (Object.keys(selected).length === 0) {
      if (mode !== "normal") {
        inputRef.current.value = "";
      }
    } else {
      if (mode !== "normal") {
        inputRef.current.value =
          typeof option !== "string"
            ? ArrayOption(selected, option)
            : selected[option];
      }
      prevInputValue.current =
        typeof option !== "string"
          ? ArrayOption(selected, option)
          : selected[option];
      //   print(inputRef.current.value);
      if (prevSelectedRef.current !== undefined) {
        onChange();
      }
    }
    prevSelectedRef.current = selected;
  };

  useEffect(() => {
    console.log(selected);
    handleOnSelectedChange();
  }, [selected]);

  //*************** ********** ***************

  const ArrayOption = (v, option) => {
    let optionReturned = "";
    for (let x in option) {
      optionReturned = optionReturned + v[option[x]];

      if (x != option.length - 1) {
        optionReturned = optionReturned + " - ";
      }
    }
    return optionReturned;
  };

  //*************** ********** ***************

  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const elementRef = useRef(null);

  const rect = elementRef.current
    ? elementRef.current.getBoundingClientRect()
    : {};

  // useEffect(() => {
  //   if (elementRef.current) {

  //     console.log("Posición del elemento:", rect);
  //     console.log(rect.width);
  //     dropdownContainerStyle.current = {
  //       ...dropdownContainerStyle.current,
  //       width: rect.width,
  //     };
  //   }
  // }, []);

  const ColStart = `colum_start__${
    width > 1919
      ? start[0]
      : width > 1199
      ? start[1]
      : width > 769
      ? start[2]
      : width > 374
      ? start[3]
      : start[3]
  } `;
  return (
    <>
      <div className={start == "" ? "" : ColStart}>
        <div className="dropdown ">
          <label
            // className="block mb-2 label_text text-gray-900 light:text-white"
            style={labelText}
          >
            {label}
          </label>
          <ClickAwayListener
            onClickAway={() => {
              select.CloseDropdown();
            }}
          >
            <div ref={elementRef}>
              {mode == "normal" ? (
                <NormalSelect
                  data={data}
                  option={option}
                  style={style}
                  select={select}
                  disabled={disabled}
                />
              ) : (
                <div className="flex">
                  <SearchInput
                    data={data}
                    option={option}
                    style={style}
                    select={select}
                    disabled={disabled}
                    onInputChange={onInputChange}
                  />
                  <DropButton select={select} disabled={disabled} />
                </div>
              )}
            </div>
          </ClickAwayListener>
          <DropdownContainer
            rect={rect}
            mapKey={mapKey}
            option={option}
            setSelected={setSelected}
            ArrayOption={ArrayOption}
            data={data}
            select={select}
          />
          {/* <div
          className={show ? "show" : "noshow"}
          style={dropdownContainerStyle.current}
        >
          {(dataFilter.length > 0 ? dataFilter : data)?.map((v) => (
            <Option
              key={v[mapKey]}
              v={v}
              mapKey={mapKey}
              option={option}
              setSelected={setSelected}
              ArrayOption={ArrayOption}
              data={data}
            />
          ))}
        </div> */}
        </div>
      </div>
    </>
  );
}

export default SelectFilter;
