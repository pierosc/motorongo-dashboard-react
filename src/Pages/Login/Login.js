import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { IconButton } from "@mui/material";
import logo from "../../assets/639bff074f93be0999466684_logonegro.png";

const Login = () => {
  const [loadingToken, setLoadingToken] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => {
    setVisibility(!visibility);
  };

  const [captureInputs, setCaptureInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = captureInputs;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCaptureInputs({
      ...captureInputs,
      [e.target.name]: e.target.value,
    });
  };

  const sendLogin = async () => {
    try {
      const url = `${process.env.REACT_APP_TERA_URL}back-office/staff/login`;

      const header = {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_TOKEN,
      };

      const body = JSON.stringify({
        username: username,
        password: password,
      });

      const data = await axios(url, {
        method: "POST",
        headers: header,
        data: body,
      });

      sessionStorage.setItem("user", JSON.stringify(data?.data));
      // navigate("/login");
      setLoading(false);
      toast.success("Usuario autenticado", {
        theme: "dark",
      });
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Algo salio mal", {
        theme: "dark",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLogin();
    setLoading(true);
  };

  // useEffect(() => {
  //   sessionStorage.clear();
  // }, []);

  return (
    <div className="BG_login">
      <form
        onSubmit={handleSubmit}
        className="flex justify-end items-center relative min-h-screen bg-cover bg-center mx-5"
      >
        <div className="m-3 absolute top-0 left-0 ancho_movil w-20 md:w-20">
          {/* <img src={logo} alt="Logo_TERABIKE" /> */}
        </div>
        <div className="flex w-full justify-center center_login form_right">
          <div className="flex flex-col mx-5 w-1/4 form_container form_container2">
            {/* <div className="flex w-full justify-center"> */}
            {/* <img
                className="flex h-24 ancho_yachay w-24 justify-center"
                src={yachay}
                alt="yachay_logo"
              /> */}
            {/* </div> */}
            <div className="flex w-full justify-center py-5">
              <img src={logo} />
            </div>
            <div className="w-720 form_container_altura color_box  form_border pt-5 shadow-lg shadow-gray-800 opacity-40" />
            <div className="flex flex-col ancho_input w-64 input_margin gap-5 absolute completar mt-48 form_left justify-center items-center">
              <>
                <div className="flex w-full mt-5  rounded-md border-4 bg_input border_input">
                  <input
                    className=" w-full px-2 py-1 rounded-r-sm font-medium input_letter text-gray-400 outline-none"
                    placeholder="USUARIO"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                  <IconButton size="small" disabled>
                    <PersonIcon className="ml-0.5 text-white" />
                  </IconButton>
                </div>
                <div className="flex w-full  rounded-md border-4 bg_input border_input">
                  <input
                    className="w-full px-2 py-1 rounded-r-sm font-medium input_letter text-gray-300 outline-none"
                    placeholder="CONTRASEÑA"
                    type={visibility === false ? "password" : "text"}
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <IconButton
                    size="small"
                    type="button"
                    onClick={changeVisibility}
                  >
                    {visibility === false ? (
                      <VisibilityOffIcon className="ml-0.5 text-white" />
                    ) : (
                      <VisibilityIcon className="ml-0.5 text-white" />
                    )}
                  </IconButton>
                </div>

                {loading ? (
                  <div className="lds-circle">
                    <div></div>
                  </div>
                ) : (
                  <button className="color_button text-white font-medium input_letter rounded-md py-1 px-6 hover:border-gray-400">
                    INGRESAR
                  </button>
                )}
              </>

              <div className="flex justify-center">
                <label>v 1.0.1</label>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default Login;
