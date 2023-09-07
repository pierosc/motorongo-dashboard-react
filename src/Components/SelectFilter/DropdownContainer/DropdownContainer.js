import React, { useContext, useState, useEffect, useRef } from "react";
import Option from "../Option/Option";
import SelectFilterContext from "../SelectContext";
import { dropdownContainer } from "../SelectStyle";
import { createPortal } from "react-dom";

function DropdownContainer({
  rect,
  mapKey,
  option,
  setSelected,
  ArrayOption,
  data,
  select,
}) {
  const { show, dataFilter } = useContext(SelectFilterContext);

  console.log(rect?.top);
  console.log(rect?.height);
  console.log(Number(dropdownContainer.maxHeight.split("px")[0]));
  console.log("**");
  console.log(
    rect?.top +
      rect?.height +
      Number(dropdownContainer.maxHeight.split("px")[0])
  );
  console.log(window.innerHeight);
  console.log("------------");

  const dropdownContainerStyle = {
    ...dropdownContainer,
    width: rect?.width,
    left: rect?.left,
    top:
      rect?.top +
        rect?.height +
        Number(dropdownContainer.maxHeight.split("px")[0]) <
      window.innerHeight
        ? rect?.top + rect?.height
        : rect?.top - Number(dropdownContainer.maxHeight.split("px")[0]),
  };

  return (
    <>
      {select.IsOpened() &&
        createPortal(
          <div
            style={{
              position: "fixed",
              //   display: "none",
              zIndex: "1300",
              right: "0",
              left: "0",
              top: "0",
              bottom: "0",
            }}
          >
            <div
              className={show ? "show" : "noshow"}
              style={dropdownContainerStyle}
            >
              {(dataFilter.length > 0 ? dataFilter : data)?.map(
                (v) =>
                  !v?.hidden && (
                    <Option
                      key={v[mapKey]}
                      v={v}
                      mapKey={mapKey}
                      option={option}
                      setSelected={setSelected}
                      ArrayOption={ArrayOption}
                      data={data}
                    />
                  )
              )}
            </div>
            ,
          </div>,
          document.body
        )}
    </>
  );
}

export default DropdownContainer;
