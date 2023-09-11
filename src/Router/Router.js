import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  HashRouter,
} from "react-router-dom";
// import App from "../App";
/* import Control from "../components/ReportingControl/Control/Control"; */
// import HorarioGrupoDocente from "../components/HorarioGrupoDocente/HorarioGrupoDocente";
// import CuadroNecesidad from "../components/CuadroNecesidad/CuadroNecesidad";
import ProtectedRoute from "./ProtectedRoute";
import PortectedRouteLogin from "./PortectedRouteLogin";
// import CargaNoLectiva from "../components/CargaNoLectiva/CargaNoLectiva/CargaNoLectiva";
// import ExtraCurricular from "../components/MatriculaExtracur/MatriculaExtracurricular";
// import MCargaNoLectiva from "../components/Mantenimiento/CargaNoLectiva/MCargaNoLectiva"; //se agrego D:\Documentos\Documentos\GitHub\carga-academica\src\components\Mantenimiento\CargaNoLectiva\NonStudyLoad.js
// import Courses from "../components/Mantenimiento/Courses/Courses";
// import LoginRefactor from "../components/Login/Login";
import Login from "../Pages/Login/Login";
import App from "../App";
import TripsView from "../Pages/TripsView/TripsView";
import Metrics from "../Pages/Metrics/Metrics";
import User from "../Pages/User/User";
// import ImgNotFound from "../components/NotFoundPage/NotFoundPage";
// import Seguimiento from "../components/Asistencia/Seguimiento/Seguimiento";
// import ImgNotFoundByeJT from "../components/NotFoundPage/NotFoundPageByeJT";
// import AddDateEPEL from "../components/Mantenimiento/EPELdateModule/EPELdateModule";
// import { EPELdateModuleProvider } from "../components/Mantenimiento/EPELdateModule/EPELdateModuleContext";
const Router = () => {
  // const getUser = JSON.parse(sessionStorage.getItem("user"));
  return (
    <HashRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<App />}>
            <Route index element={<TripsView />} />
            <Route path="/trips" element={<TripsView />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/user" element={<User />} />
            {/* <Route path="/inicio" element={<Inicio />} /> */}
            {/* <Route path={"customComponents"} element={<CustomComponents />} /> */}
            {/* <Route path={"AddDateEPEL"} element={<AddDateEPEL />} /> */}
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <PortectedRouteLogin>
              <Login />
            </PortectedRouteLogin>
            // <ImgNotFoundByeJT to="/NotFound" replace />
          }
        />
        {/* <Route path="*" element={<ImgNotFound to="/NotFound" replace />} /> */}
      </Routes>
    </HashRouter>
  );
};

export default Router;
