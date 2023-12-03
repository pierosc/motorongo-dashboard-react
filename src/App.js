import React from "react";
import "./App.css";
import { color } from "./Utils/Colors";
import Outlet from "./Outlet";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col ">
        {/* NAVBAR */}
        <div
          className="flex justify-start"
          style={{ backgroundColor: color.green, minHeight: "7vh" }}
        >
          <div className="ml-4 flex items-center">
            <label className="text-white">MINERIA DE DATOS</label>
          </div>
        </div>
        {/* OUTLET */}
        <div
          className="flex justify-center"
          style={{ backgroundColor: color.clarito, height: "93vh" }}
        >
          <div
            style={{
              width: "1200px",
              maxWidth: "90vw",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
