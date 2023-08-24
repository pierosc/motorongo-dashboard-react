import React, { useState, useEffect, useLayoutEffect } from "react";
import validate from "validate.js";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; //pruebase usara para meter el icono de error

function Input({
  label = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  style = "standard",
  validationType = null,
  charlength = 1000,
  start = "",
}) {
  // prueva de validacion
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false); // nueva variable para ver si esta vacio
  const [isDisabled, setIsDisabled] = useState(false); // prueba para reducir disable
  const messagelenght = `"No puede escribir más de ${charlength} caracteres "`;
  const [width, setWidth] = useState(0);

  const handleValidate = (value) => {
    const constraints = {};
    if (validationType === "numeric") {
      // validamos numerico y alfabetico
      constraints.value = {
        format: {
          pattern: /^[0-9]+$/, // solo numeros
          message: "Solo escribir números.",
        },
        length: {
          maximum: charlength,
          message: charlength === 1000 ? "" : messagelenght,
        },
      };
    } else if (validationType === "alphabetic") {
      constraints.value = {
        format: {
          pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, // parametreos para permitir letras tanto mayusculas como
          message: "Solo escribir letras.",
        },
        length: {
          maximum: charlength,
          message: charlength === 1000 ? "" : messagelenght,
        },
      };
    } else if (validationType === "adress") {
      constraints.value = {
        format: {
          pattern: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\-\/°().,\s]+$/g, // parametreos para permitir letras tanto mayusculas como
          message: "Evite caracteres extraños.",
        },
        length: {
          maximum: charlength,
          message: charlength === 1000 ? "" : messagelenght,
        },
      };
    } else if (validationType === "alphanumeric") {
      constraints.value = {
        format: {
          pattern: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+$/g, // parametreos para permitir letras tanto mayusculas como
          message: "Solo escribir letras y números.",
        },
        length: {
          maximum: charlength,
          message: charlength === 1000 ? "" : messagelenght,
        },
      };
    } else if (validationType === "email") {
      constraints.value = {
        format: {
          // pattern: /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.@]+$/,
          pattern: /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.@]+$/,
          message: "Solo escribir caracteres validos para correo.",
        },
        length: {
          maximum: charlength,
          message: charlength === 1000 ? "" : messagelenght,
        },
      };
    }

    const errors = validate({ value: value }, constraints);
    if (value === "") {
      setError(""); // con esto borrariamos el campo de erro para que se pueda borrar todo al estar nuevamente vacio
      return false;
    } else if (errors) {
      setError(errors.value[0].replace("Value ", "")); // quitamos value replace("value ", "")
      return true;
    } else {
      setError(""); //al inicio cuando esta vacio no mostrar error
      return false;
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (validationType) {
      const hasError = handleValidate(value);
      if (hasError) {
        return;
      }
    }

    onChange(e);
    setIsEmpty(value === ""); // actualizamos el estado isEmpty dependiendo si el valor es vacío o no
  };
  // prueba de validacion

  // lo que se quiere hacer es saber si esta vacio o no
  useEffect(() => {
    if (style === "required" && !value) {
      // si el campo es requerido y está vacío
      setIsEmpty(true); // actualizamos la variable de estado
      setError("Este campo es obligatorio."); // mostramos el mensaje de error
    } else {
      setIsEmpty(false);
      // setError("");//modificado
    }
    if (style === "disabled") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  });

  // const diactivate =`${isDisabled?"disable":""}`; //prueba para reducir el disable

  // prueba de cambiar estilos en el mismo className
  const inputClassEmpty = `outline-none bg-gray-50 ${
    isDisabled ? "bg-gray-300" : "" // si esta desabilitado, cambiamos una clase para opacarlo
  }${
    isEmpty ? "bg-[#FEDBD7]" : ""
  } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 ${
    isEmpty ? "bg-[#FEDBD7]" : ""
  } ${
    isEmpty ? "focus:border-red-400" : "focus:border-blue-500"
  } block w-full p-2.5 ${
    isEmpty ? "border-red-400" : ""
  } light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500`;
  // prueba de cambiar estilos en el mismo className

  //prueba de colocar imagen en el place holder
  //   const placeholderText = style === "required" && isEmpty
  // ? <span className="flex items-center">
  //     <ErrorOutlineIcon className="mr-1" />
  //     Este campo es obligatorio
  //   </span>
  // : placeholder;
  //prueba de colocar imagen en el place holder
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
      <label
        className="block mb-2 label_text text-gray-900 light:text-white"
        htmlFor={label}
      >
        {label}
      </label>
      {/* se volvio relativo para mandarlo arriba a la derecha y que solo se activara si es vacio y relativo */}
      <div className="relative">
        {style === "required" && isEmpty && (
          <div className="absolute top-2 right-2">
            <ErrorOutlineIcon className="text-red-500" />
          </div>
        )}

        {style === "disabled" ? (
          <input
            className={inputClassEmpty}
            tile={label}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled
          />
        ) : null || style === "standard" || style === "required" ? (
          <input
            className={inputClassEmpty}
            tile={label}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            // onBlur={validationType === "email"? handleChange:null}
          />
        ) : null}
      </div>
      {/* aqui acaba el dib que se le coloco al icono */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}

export default Input;
