import React, { useRef, useContext } from "react";
// import {
//   print,
//   printGroup,
//   printEnd,
//   printCollapsed,
// } from "./../../../../utils/utils";
import SelectFilterContext from "../SelectContext";

function Option({ v, mapKey, option, setSelected, ArrayOption, data }) {
  const {
    setShow,
    setDataFilter,
    inputRef,
    prevInputValue,
    selectedOptionText,
  } = useContext(SelectFilterContext);

  var xPos;
  var yPos;
  const end = useRef(false);

  const selectOption = () => {
    selectedOptionText.current =
      typeof option !== "string" ? ArrayOption(v, option) : v[option];
    if (inputRef.current !== undefined) {
      inputRef.current.value = selectedOptionText.current;
    }
    prevInputValue.current = selectedOptionText.current;
  };

  const handleTouchStart = (e) => {
    xPos = e.touches[0].clientX;
    yPos = e.touches[0].clientY;
    // print("X: " + xPos);
    // print("Y: " + yPos);
    end.current = true;
  };

  const handleTouchMove = (e) => {
    const fingerMoved = () => {
      return (
        e.touches[0].clientY < yPos - 10 || e.touches[0].clientY > yPos + 10
      );
    };
    end.current = !fingerMoved();
    // if (fingerMoved()) {
    //   print("te saliste we");
    //   end.current = false;
    // } else {
    //   print("sigues cerca");
    //   end.current = true;
    // }
  };

  const handleTouchEnd = (e) => {
    if (end.current) {
      // inputRef.current.value =
      //   typeof option !== "string" ? ArrayOption(v, option) : v[option];
      // prevInputValue.current = inputRef.current.value;
      selectOption();

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
  };

  const handleClick = () => {
    selectOption();
    // inputRef.current.value =
    //   typeof option !== "string" ? ArrayOption(v, option) : v[option];
    // prevInputValue.current = inputRef.current.value;

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
  };

  return (
    <a
      className="cursor-pointer text-sm option"
      key={v[mapKey]}
      onTouchStart={(e) => {
        handleTouchStart(e);
      }}
      onTouchMove={(e) => {
        handleTouchMove(e);
      }}
      onTouchEnd={(e) => {
        handleTouchEnd(e);
      }}
      onClick={() => {
        handleClick();
      }}
    >
      {typeof option !== "string" ? ArrayOption(v, option) : v[option]}
    </a>
  );
}

export default Option;
