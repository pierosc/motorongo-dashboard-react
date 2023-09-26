import React from "react";
import "./App.css";
import TripsView from "./Pages/TripsView/TripsView";
import Login from "./Pages/Login/Login";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Outlet, Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { color } from "./Utils/Colors";
import logo from "./assets/tera_logoblanco.png";

function App() {
  const [toggled, setToggled] = React.useState(false);
  const navigate = useNavigate();

  const menuItemStyle = {
    ["." + menuClasses.button]: {
      // backgroundColor: "red",
      // color: "white",
      "&:hover": {
        backgroundColor: "gray !important",
      },
    },
  };

  return (
    <div className="App">
      {/* <div className="m-3 absolute top-0 left-0 ancho_movil w-20 md:w-20">
        <IconButton onClick={() => setToggled(!toggled)}>
          <MenuIcon />
        </IconButton>
      </div> */}
      <div className="flex flex-col ">
        {/* NAVBAR */}
        <div
          className="flex justify-start"
          style={{ backgroundColor: color.green, minHeight: "60px" }}
        >
          <IconButton
            onClick={() => setToggled(!toggled)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <div
            // style={{ maxHeight: "20px", height: "20px" }}
            className="ml-4 flex items-center"
          >
            <img src={logo} style={{ objectFit: "contain", height: "40px" }} />
          </div>
        </div>
        {/* OUTLET */}
        <div
          className="flex justify-center"
          style={{ backgroundColor: color.clarito }}
        >
          <div style={{ width: "1200px", maxWidth: "90vw" }}>
            <Outlet />
          </div>
        </div>
        v 0.0.7
      </div>
      {/* SIDEBAR */}
      <div
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: color.dark,
        }}
      >
        <Sidebar
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="always"
          backgroundColor={color.dark}
        >
          <Menu>
            <MenuItem
              className="text-white"
              rootStyles={menuItemStyle}
              component={<Link to="/trips" />}
            >
              Viajes
            </MenuItem>
            <MenuItem
              className="text-white"
              rootStyles={menuItemStyle}
              component={<Link to="/metrics" />}
            >
              Métricas
            </MenuItem>
            <MenuItem
              className="text-white"
              rootStyles={menuItemStyle}
              component={<Link to="/user" />}
            >
              {" "}
              Usuarios
            </MenuItem>
            {/* <MenuItem> Examples</MenuItem> */}
          </Menu>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={() => {
                sessionStorage.clear();
                navigate("/login");
              }}
              className="w-32 mt-4 py-2 px-3 text-sm font-medium text-center text-white rounded-lg  focus:outline-none sidebarRefactor__group-btn flex items-center justify-center gap-4 "
            >
              Salir <LogoutIcon />
            </button>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
