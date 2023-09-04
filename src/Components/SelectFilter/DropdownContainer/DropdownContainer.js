import React, { useContext, useRef, useEffect } from "react";
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
  const {
    show,
    // setShow,
    dataFilter,
    // setDataFilter,
    // width,
    // setWidth,
    // inputRef,
    // // prevDataRef,
    // prevSelectedRef,
    // prevInputValue,
  } = useContext(SelectFilterContext);

  const dropdownContainerStyle = useRef({
    ...dropdownContainer,
    width: rect?.width,
    left: rect?.left,
    top: rect?.top + rect?.height,
  });

  // const dropdownContainerStyle = {
  //   ...dropdownContainer,
  //   width: rect?.width,
  //   left: rect?.left,
  //   top: rect?.top + rect?.height,
  // };

  useEffect(() => {
    console.log(rect?.top);
    dropdownContainerStyle.current = {
      ...dropdownContainer,
      width: rect?.width,
      left: rect?.left,
      top: rect?.top + rect?.height,
    };
    console.log(dropdownContainerStyle.current);
  }, [rect?.top]);

  return (
    <>
      {select.IsOpened() &&
        createPortal(
          //   <div
          //     style={{
          //       position: "fixed",
          //       //   display: "none",
          //       zIndex: "1300",
          //       right: "0",
          //       left: "0",
          //       top: "0",
          //       bottom: "0",
          //     }}
          //   >
          <div
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
          </div>,
          //   </div>,
          document.body
        )}
      {/* <div
      style={{
        position: "fixed",
        display: "none",
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
        </div>
      </div> */}
    </>
  );
}

export default DropdownContainer;
