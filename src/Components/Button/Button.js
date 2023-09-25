import React, { useState, useLayoutEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EditIcon from "@mui/icons-material/Edit";
import "./Button.css";
import { color } from "../../Utils/Colors";

function Button({ text, design, onClick, className, icono, start = "" }) {
  const [loadingButton, setloadingButton] = useState(false);
  const [width, setWidth] = useState(0);
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
      <div className={`justify-end`}>
        {design === "success" && (
          <button
            className="flex w-full items-center justify-center py-2 px-4 button_text text-center text-white rounded-lg  focus:outline-none h-10 gap-1"
            style={{ backgroundColor: color.blue }}
            onClick={onClick}
          >
            {text.toUpperCase()}

            {icono === "save" && <SaveIcon />}

            {icono === "search" && <SearchIcon />}

            {icono === "check" && <CheckCircleOutlineIcon />}
          </button>
        )}

        {design === "error" && (
          <button
            className="flex w-full justify-center items-center py-2 px-4 button_text button_error_color text-center text-white rounded-lg  focus:outline-none h-10 gap-1"
            onClick={onClick}
          >
            {text.toUpperCase()}

            <ErrorOutlineIcon />
          </button>
        )}
        {design === "text" && (
          <button
            className=" w-full py-2   text-start text-sm font-extrabold underline text-sky-800 focus:outline-none h-10 gap-1"
            style={{ backgroundColor: "transparent" }}
            onClick={onClick}
          >
            {text}
          </button>
        )}
        {design === "edit" && (
          <button
            className="flex w-full justify-center items-center py-2 px-4 button_text bg-yellow-500 text-center text-white rounded-lg  focus:outline-none hover:bg-yellow-400 h-10 gap-1"
            onClick={onClick}
          >
            {text.toUpperCase()}

            <EditIcon />
          </button>
        )}

        {design === "disabled" && (
          <button
            className="disabled flex w-full justify-center items-center py-2 px-4 button_text button_disabled text-center rounded-lg gap-2 h-10"
            disabled={design === "disabled"}
          >
            <div>
              <span className=" text-center align-middle  capitalize">
                {text.toUpperCase()}
              </span>
            </div>
          </button>
        )}

        {design === "personal" && (
          <button
            className={`flex  justify-center items-center py-2 px-4 button_text  text-center text-white rounded-lg  focus:outline-none  gap-2 ${className}`}
            onClick={onClick}
          >
            <span className=" text-center align-middle  capitalize">
              {text}
            </span>
          </button>
        )}

        {design === "load" && (
          <button
            type="submit"
            disabled
            className="flex w-full justify-center items-center py-2 px-4 button_text bg-gray-400 text-center text-white rounded-lg  focus:outline-none gap-2 h-10"
          >
            <svg
              role="status"
              className="inline mr-2 w-3 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Cargando...
          </button>
        )}

        {design === "cancel" && (
          <button
            className="flex w-full justify-center items-center py-2 px-4 button_text  text-center text-white rounded-lg  button_modal_red_color focus:outline-none gap-2 h-10"
            onClick={onClick}
          >
            {text.toUpperCase()}
          </button>
        )}
      </div>
    </div>
  );
}

export default Button;
