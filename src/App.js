import React from "react";
import "./App.css";
import TripsView from "./Pages/TripsView/TripsView";
import Login from "./Pages/Login/Login";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Outlet, Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function App() {
  const [toggled, setToggled] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* <div className="m-3 absolute top-0 left-0 ancho_movil w-20 md:w-20">
        <IconButton onClick={() => setToggled(!toggled)}>
          <MenuIcon />
        </IconButton>
      </div> */}
      <div className="flex flex-col ">
        <div className="flex justify-start" style={{ backgroundColor: "grey" }}>
          <IconButton
            onClick={() => setToggled(!toggled)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className="flex justify-center">
          <div style={{ width: "1200px", maxWidth: "90vw" }}>
            <Outlet />
          </div>
        </div>
        v 0.0.4
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          // , minHeight: "400px"
        }}
      >
        <Sidebar
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="always"
        >
          <Menu>
            <MenuItem component={<Link to="/trips" />}> Viajes</MenuItem>
            <MenuItem component={<Link to="/metrics" />}> Métricas</MenuItem>
            <MenuItem component={<Link to="/user" />}> Usuarios</MenuItem>
            {/* <MenuItem> Examples</MenuItem> */}
          </Menu>
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
        </Sidebar>
      </div>
    </div>
  );
}

export default App;
