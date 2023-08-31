import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import CheckVersion from "./useCheckVersion";
import {
  print,
  printCollapsed,
  printEnd,
  printGroup,
} from "../Utils/consoleToPrint";

const usePostRequest = (
  url,
  setData,
  body,
  thenFunction = () => {},
  errorFunction = () => {},
  setLoading = () => {}
) => {
  // CheckVersion();
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  // ****************************************************************************
  // Corrección de data si no se necesita "setData" para renderizar
  // ****************************************************************************

  let newSetData = typeof setData === "object" ? () => {} : setData;
  let newBody = typeof setData === "object" ? setData : body;
  let newThenFunction = typeof setData === "object" ? body : thenFunction;
  let newErrorFunction =
    typeof setData === "object" ? thenFunction : errorFunction;
  let newSetLoading = typeof setData === "object" ? errorFunction : setLoading;

  // ****************************************************************************

  const fetchData = async (secondBody) => {
    setIsLoading(true);
    newSetLoading(true);

    // const getUser = JSON.parse(sessionStorage.getItem("user"));
    const header = {
      "Content-Type": "application/json",
      Authorization: process.env.REACT_APP_TOKEN,
    };
    if (typeof newSetData !== "function") {
      print(
        "La variable del setState no es una función, esto podría generar errores"
      );
    }
    await axios(url, {
      method: "POST",
      headers: header,
      data: secondBody === undefined ? JSON.stringify(newBody) : secondBody,
    })
      .then(function (data) {
        if (data?.data !== "") {
          printCollapsed("Respuesta de Endpoint: " + url);
          print(data);
          printEnd();

          newSetData(data?.data);

          newSetLoading(false);

          newThenFunction(data?.data);
        } else {
          printCollapsed("Data vacía de Endpoint: " + url);
          printCollapsed("*DATA*");
          print(data);
          printEnd();
          printEnd();

          newErrorFunction();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        printCollapsed("ERROR de Endpoint: " + url);
        printCollapsed("*DATA*");
        print(error);
        printEnd();

        if (
          error?.response?.status === 403 ||
          error?.message === "Network Error"
        ) {
          printEnd();
          // getNewToken();
        } else {
          if (error.response?.data?.message) {
            newSetData(JSON.parse(error.response?.data?.message));

            printGroup("*MENSAJE DE ERROR*");
            print(JSON.parse(error.response?.data?.message));
            printEnd();

            printEnd();
          }

          newErrorFunction();
        }
      });
  };

  const fetchDataAgain = async (secondBody) => {
    setIsLoading(true);
    newSetLoading(true);
    const getUser = JSON.parse(sessionStorage.getItem("user"));
    const header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getUser?.TOKEN,
    };

    await axios(url, {
      method: "POST",
      headers: header,
      data: secondBody === undefined ? JSON.stringify(newBody) : secondBody,
    })
      .then(function (data) {
        if (data?.data !== "") {
          printCollapsed("Respuesta de Endpoint: " + url + " second time");
          print(data);
          printEnd();

          newSetData(data?.data);

          newSetLoading(false);

          newThenFunction(data?.data);
        } else {
          printCollapsed("ERROR de Endpoint: " + url);
          printCollapsed("*DATA*");
          print(data);
          printEnd();
          printEnd();

          newErrorFunction();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        printCollapsed("ERROR de Endpoint: " + url + " second time");
        printCollapsed("*DATA*");
        print(error);
        printEnd();

        if (
          error?.response?.status === 403 ||
          error?.message === "Network Error"
        ) {
          sessionStorage.clear();
          toast.error("Token vencido", { theme: "dark" });
          // navigate("/login");
        } else {
          if (error.response?.data?.message) {
            newSetData(JSON.parse(error.response?.data?.message));

            printGroup("*MENSAJE DE ERROR*");
            print(JSON.parse(error.response?.data?.message));
            printEnd();
            printEnd();
          }

          newErrorFunction();
        }
      });
  };

  const getNewToken = async () => {
    const getUser = JSON.parse(sessionStorage.getItem("user"));
    const url = `${process.env.REACT_APP_URL}user/refresh-token`;

    const header = {
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      refresh_token: getUser?.REFRESH_TOKEN,
    });

    await axios(url, {
      method: "POST",
      headers: header,
      data: body,
    })
      .catch((error) => {
        print(error);
        sessionStorage.clear();
        toast.error("Token vencido", { theme: "dark" });
        // navigate("/login");
      })
      .then(function (response) {
        getUser.REFRESH_TOKEN = response.data.REFRESH_TOKEN;
        getUser.TOKEN = response.data.TOKEN;
        printCollapsed("New tokens");
        printGroup("REFRESH_TOKEN");
        print(response.data.REFRESH_TOKEN);
        printEnd();
        printGroup("TOKEN");
        print(response.data.TOKEN);
        printEnd();
        printEnd();
        sessionStorage.setItem("user", JSON.stringify(getUser));
        fetchDataAgain();
      });
  };

  return [fetchData, isLoading];
};

export default usePostRequest;
