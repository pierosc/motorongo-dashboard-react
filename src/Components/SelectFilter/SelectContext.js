import { createContext, useState, useRef } from "react";

const SelectFilterContext = createContext();

const SelectFilterProvider = ({ children }) => {
  const [show, setShow] = useState(false); //  muestra o no la lista de opciones
  const inputRef = useRef();
  const [dataFilter, setDataFilter] = useState([]);
  // const prevDataRef = useRef(); // valor de la lista de datos anterior (usado para evitar ejecución en primera renderización)
  const prevSelectedRef = useRef();
  const prevInputValue = useRef(); // valor del valor anterior (texto)
  const selectedOptionText = useRef(); // valor de seleccion (texto)
  const [width, setWidth] = useState(0);

  return (
    <SelectFilterContext.Provider
      value={{
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
        selectedOptionText,
      }}
    >
      {children}
    </SelectFilterContext.Provider>
  );
};

export { SelectFilterProvider };
export default SelectFilterContext;
