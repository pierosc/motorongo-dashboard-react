import React, { useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import useOnchange from "../../../hooks/useOnChange";

function Filter({ filterTitle, index, setFilterGroup, filterGroup }) {
  const inputSearch = useRef();

  const filterkey = "filter" + index;

  const FilterData = debounce(() => {
    setFilterGroup({
      ...filterGroup,
      [filterkey]: inputSearch?.current?.value,
    });
  }, 400);

  //Setear valor con el guardado en el sessionStorage

  useEffect(() => {
    inputSearch.current.value = filterGroup?.[filterkey];
  }, [filterGroup]);

  //************+************************************* */

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white ">
        {filterTitle}
      </label>
      <input
        ref={inputSearch}
        onChange={FilterData}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
      ></input>
    </div>
  );
}

export default Filter;
