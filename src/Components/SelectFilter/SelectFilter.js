"use client";
import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./CustomSelectFilter.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ClickAwayListener from "@mui/base/ClickAwayListener";
// import {
//   console.log,
//   printGroup,
//   printEnd,
//   printCollapsed,
// } from "./../../../utils/utils";

function SelectFilter({
  data = [],
  option = "",
  mapKey = "",
  selected = {},
  setSelected = () => {},
  label = "",
  style = "",
  onChange = () => {},
  start = "",
}) {
  const [show, setShow] = useState(false);
  const inputRef = useRef();
  const [dataFilter, setDataFilter] = useState([]);
  const prevDataRef = useRef();
  const prevSelectedRef = useRef();
  const prevInputValue = useRef();
  // const prevData = useRef(second)
  const [width, setWidth] = useState(0);

  const filterFunction = () => {
    setDataFilter(
      data.filter((v) =>
        v[option].toUpperCase().includes(inputRef?.current?.value.toUpperCase())
      )
    );
  };

  //*************** ON DATA CHANGE ***************

  const handleDataChange = () => {
    // if (data.length === 0) {
    if (prevDataRef.current !== undefined) {
      setSelected({});
      prevInputValue.current = "";
    }
    prevDataRef.current = data;
    // }
  };

  useEffect(() => {
    handleDataChange();
  }, [data]);

  //*************** ON SELECT CHANGE ***************

  const handleOnSelectedChange = () => {
    if (Object.keys(selected).length === 0) {
      //   console.log("F");
      inputRef.current.value = "";
    } else {
      //   console.log("FF");
      inputRef.current.value =
        typeof option !== "string"
          ? ArrayOption(selected, option)
          : selected[option];
      prevInputValue.current =
        typeof option !== "string"
          ? ArrayOption(selected, option)
          : selected[option];
      //   console.log(inputRef.current.value);
      if (prevSelectedRef.current !== undefined) {
        onChange();
      }
    }
    prevSelectedRef.current = selected;
  };

  useEffect(() => {
    // console.log("selected " + label);
    // console.log(selected);
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
  const handleClickAway = () => {
    setShow(false);
    inputRef.current.value =
      prevInputValue.current == undefined ? "" : prevInputValue.current;
  };

  const end = useRef(false);
  var xPos;
  var yPos;

  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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
    <div className={start == "" ? "" : ColStart}>
      <div className="dropdown">
        {label !== "" && (
          <label className="block mb-2 label_text text-gray-900 light:text-white">
            {label}
          </label>
        )}

        {/* <ClickAwayListener onClickAway={handleClickAway}> */}
        <div className="flex">
          <div
            onClick={() => {
              if (data.length !== 0) {
                if (inputRef.current.disabled === true) {
                  setShow(true);

                  inputRef.current.value = "";
                }
              }
            }}
            className={"w-full"}
          >
            <input
              ref={inputRef}
              disabled={!show || data.length === 0}
              placeholder={show ? "Buscar 🔎" : "Seleccionar"}
              onChange={() => {
                filterFunction();
              }}
              className={`
            ${!show && data.length !== 0 ? "cursor-pointer" : ""} ${
                data.length === 0 ? "bg-gray-300" : "bg-gray-50"
              } border-y border-l border-gray-300 text-gray-900 text-sm rounded-l-lg  block w-full
            ${style === "big" ? "p-2.5" : "p-1.5"}
            `}
            ></input>
          </div>

          <button
            onClick={() => {
              inputRef.current.value = "";
              if (!show) {
                setShow(true);
              }

              // console.log(inputRef.current.value);
              if (show) {
                setShow(false);
                inputRef.current.value =
                  prevInputValue.current == undefined
                    ? ""
                    : prevInputValue.current;
              }
            }}
            disabled={data.length === 0}
            className={`${
              data.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : show
                ? "bg-gray-200 border-l"
                : "bg-gray-50"
            } border-y border-r border-gray-300 color-900 dropbtn rounded-r-lg`}
          >
            {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </button>
        </div>
        {/* </ClickAwayListener> */}

        <div className={show ? "show" : "noshow"}>
          {(dataFilter.length > 0 ? dataFilter : data)?.map((v) => (
            <a
              className="cursor-pointer text-sm"
              key={v[mapKey]}
              onTouchStart={(e) => {
                xPos = e.touches[0].clientX;
                yPos = e.touches[0].clientY;
                console.log("X: " + xPos);
                console.log("Y: " + yPos);
                console.log(yPos - 50);
                end.current = true;
              }}
              onTouchMove={(e) => {
                // console.log(e.touches[0].clientY)
                // console.log(e.touches[0].clientY +" menor a "+(yPos-50))

                if (
                  e.touches[0].clientY < yPos - 10 ||
                  e.touches[0].clientY > yPos + 10
                ) {
                  console.log("te saliste we");
                  end.current = false;
                } else {
                  console.log("sigues cerca");
                  end.current = true;
                }
              }}
              onTouchEnd={(e) => {
                console.log(end.current);

                if (end.current) {
                  inputRef.current.value =
                    typeof option !== "string"
                      ? ArrayOption(v, option)
                      : v[option];
                  prevInputValue.current = inputRef.current.value;

                  setShow(false);
                  setDataFilter([]);
                  setSelected(
                    data.find((v) =>
                      (typeof option !== "string"
                        ? ArrayOption(v, option)
                        : v[option]
                      ).includes(inputRef?.current?.value)
                    )
                  );
                  e.stopPropagation();
                }
              }}
              onClick={(e) => {
                inputRef.current.value =
                  typeof option !== "string"
                    ? ArrayOption(v, option)
                    : v[option];
                // console.log("inputRef.current.value");
                // console.log(inputRef.current.value);
                prevInputValue.current = inputRef.current.value;

                setShow(false);
                setDataFilter([]);
                setSelected(
                  data.find((v) =>
                    (typeof option !== "string"
                      ? ArrayOption(v, option)
                      : v[option]
                    ).includes(inputRef?.current?.value)
                  )
                );
              }}
            >
              {typeof option !== "string" ? ArrayOption(v, option) : v[option]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectFilter;
