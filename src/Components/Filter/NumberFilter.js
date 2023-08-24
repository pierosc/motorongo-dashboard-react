import React, { useRef, useEffect } from "react";
import debounce from "lodash.debounce";

function NumberFilter({ filterTitle, index, setFilterGroup, filterGroup }) {
  const lessEqual = useRef();
  const greaterEqual = useRef();

  const filterkey = "filter" + index;

  const FilterData = debounce(() => {
    setFilterGroup({
      ...filterGroup,
      [filterkey]: [
        Number(greaterEqual?.current?.value),
        Number(lessEqual?.current?.value) === 0
          ? 9999
          : Number(lessEqual?.current?.value),
      ],
    });
  }, 400);

  useEffect(() => {
    FilterData();
  }, []);

  //Setear valor con el guardado en el sessionStorage

  useEffect(() => {
    if (filterGroup?.[filterkey]?.[0] != 0) {
      greaterEqual.current.value = filterGroup?.[filterkey]?.[0];
    }
    if (filterGroup?.[filterkey]?.[0] == 0) {
      greaterEqual.current.value = "";
    }
    if (filterGroup?.[filterkey]?.[1] != 9999) {
      lessEqual.current.value = filterGroup?.[filterkey]?.[1];
    }
    if (filterGroup?.[filterkey]?.[1] == 9999) {
      lessEqual.current.value = "";
    }
  }, [filterGroup]);

  //************************************************* */

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white ">
        {filterTitle}
      </label>
      <div className="flex gap-2">
        <input
          ref={greaterEqual}
          onChange={FilterData}
          placeholder="Desde"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        ></input>

        <input
          ref={lessEqual}
          onChange={FilterData}
          placeholder="Hasta"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        ></input>
      </div>
    </div>
  );
}

export default NumberFilter;
