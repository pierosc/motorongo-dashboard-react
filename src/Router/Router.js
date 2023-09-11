import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import App from "../App";
/* import Control from "../components/ReportingControl/Control/Control"; */
import HorarioGrupoDocente from "../components/HorarioGrupoDocente/HorarioGrupoDocente";
import CuadroNecesidad from "../components/CuadroNecesidad/CuadroNecesidad";
import ProtectedRoute from "./ProtectedRoute";
import PortectedRouteLogin from "./PortectedRouteLogin";
import CargaNoLectiva from "../components/CargaNoLectiva/CargaNoLectiva/CargaNoLectiva";
import Docente from "../components/Mantenimiento/Docente/Docente";
import Noticias from "../components/Noticias/Noticias";
import PropuestaDocente from "../components/PropuestaDocente/PropuestaDocente";
import Auditoria from "../components/Auditoria/Auditoria";
import Aulas from "../components/Aulas/Aulas";
import Reportes from "../components/Reportes/Reportes";
import Portada from "../components/Portada/Portada";
import CargaNoLectivaPorCarga from "../components/PropuestaCarga/PropuestaCarga";
import CargaLectiva from "../components/Reportes/CargaLectiva/CargaLectiva";
import Control from "../components/Reportes/Control/Control";
import CustomComponents from "../components/CustomComponents/CustomComponents";
import Cruces from "../components/Reportes/Cruces/Cruces";
import Formatos from "../components/Reportes/Formatos/Formatos";
import Listados from "../components/Reportes/Listados/Listados";
import RepCargaNoLectiva from "../components/Reportes/CargaNoLectiva/RepCargaNoLectiva";
import Horarios from "../components/Reportes/Horarios/Horarios";
import Propuestas from "../components/Reportes/Propuestas/Propuestas";
import LibroReclamos from "../components/LibroReclamos/LibroReclamos";
import ProcesoCierreCarga from "../components/ProcesoCierreCarga/ProcesoCierreCarga";
import View from "../components/Scholar_URP/components/view/View";
// import LoginRefactor from "../components/LoginRefactor/LoginRefactor";
import Inicio from "../components/Inicio/Inicio";
import ExtraCurricular from "../components/MatriculaExtracur/MatriculaExtracurricular";
import MCargaNoLectiva from "../components/Mantenimiento/CargaNoLectiva/MCargaNoLectiva"; //se agrego D:\Documentos\Documentos\GitHub\carga-academica\src\components\Mantenimiento\CargaNoLectiva\NonStudyLoad.js
import Courses from "../components/Mantenimiento/Courses/Courses";
import LoginRefactor from "../components/Login/Login";
import ImgNotFound from "../components/NotFoundPage/NotFoundPage";
import Seguimiento from "../components/Asistencia/Seguimiento/Seguimiento";
import ImgNotFoundByeJT from "../components/NotFoundPage/NotFoundPageByeJT";
import AddDateEPEL from "../components/Mantenimiento/EPELdateModule/EPELdateModule";
import { EPELdateModuleProvider } from "../components/Mantenimiento/EPELdateModule/EPELdateModuleContext";
const Router = () => {
  const getUser = JSON.parse(sessionStorage.getItem("user"));
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<App />}>
            <Route index element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            {getUser === null || getUser.length === 0 ? (
              <Route path="/inicio" element={<Inicio />} />
            ) : (
              Object.entries?.(getUser?.OPCIONES)?.map(([key, value]) =>
                value?.opciones?.map((data) => {
                  switch (data?.URL) {
                    case "CuadroNecesidad":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<CuadroNecesidad />}
                        />
                      );

                    case "cargaLectiva":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<HorarioGrupoDocente />}
                        />
                      );

                    //MANTENIMIENTO
                    case "mantenimientoCursos":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Courses />}
                        />
                      );
                    case "mantenimientoDocente":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Docente />}
                        />
                      );
                    case "mantenimientoNoticias":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Noticias />}
                        />
                      );
                    case "mantenimientoPabellon":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          // element={<Aulas />}
                          element={<ImgNotFound />}
                          AddDateEPEL
                        />
                      );
                    case "mantenimientoAula":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Aulas />}
                        />
                      );
                    case "mantenimientoCargaNoLectiva":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<MCargaNoLectiva />}
                        />
                      );

                    case "mantenimientoAsignacionModular":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={
                            <EPELdateModuleProvider>
                              <AddDateEPEL />
                            </EPELdateModuleProvider>
                          }
                        />
                      );

                    case "cargaNoLectiva":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<CargaNoLectiva />}
                        />
                      );

                    case "cierreCarga":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<ProcesoCierreCarga />}
                        />
                      );

                    case "propuestas":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Reportes />}
                        />
                      );

                    case "auditoria":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Auditoria />}
                        />
                      );

                    //REPORTES
                    case "reporteCargaLectiva":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<CargaLectiva />}
                        />
                      );
                    case "reporteControl":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Control />}
                        />
                      );
                    case "reporteCruces":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Cruces />}
                        />
                      );
                    case "reporteFormatos":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Formatos />}
                        />
                      );
                    case "reporteListados":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Listados />}
                        />
                      );
                    case "reporteCargaNoLectiva":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<RepCargaNoLectiva />}
                        />
                      );
                    case "reporteHorarios":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Horarios />}
                        />
                      );
                    case "reportePropuestas":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<Propuestas />}
                        />
                      );

                    case "propuestaCarga":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<CargaNoLectivaPorCarga />}
                        />
                      );

                    case "administradorReclamos":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<LibroReclamos />}
                        />
                      );

                    case "recursosAcademicos":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<View />}
                        />
                      );

                    case "matriculaExtracurricular":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<ExtraCurricular />}
                        />
                      );
                    case "convalidacionAlumno":
                      return (
                        <Route
                          key={data.URL}
                          path={data.URL}
                          element={<ImgNotFound />}
                        />
                      );

                    default:
                      return (
                        <Route
                          path="*"
                          element={<ImgNotFound to="/NotFound" replace />}
                        />
                      );
                  }
                })
              )
            )}
            <Route path={"customComponents"} element={<CustomComponents />} />
            <Route path={"AddDateEPEL"} element={<AddDateEPEL />} />

            <Route path={"NotFound"} element={<ImgNotFound />} />
            <Route
              path="*"
              element={<ImgNotFoundByeJT to="/NotFound" replace />}
            />
            {/* <Route path={"extraCurricular"} element={<ExtraCurricular />} /> */}
            {/* <Route path="cuadro-necesidades" element={<NeedsChart />} />
          <Route path="grupos-horarios-docentes" element={<GroupsTeachers />} />
          <Route path="carga-no-lectiva" element={<NonTeachingLoad />} />

          Reportes y Consultas
          <Route path="reporte-consultas/control" element={<Control />} />
          <Route path="reporte-consultas/listados" element={<Listings />} />
          <Route path="reporte-consultas/horarios" element={<Schedules />} />
          <Route path="reporte-consultas/cruces" element={<Crosses />} />
          <Route path="reporte-consultas/cruces" element={<Crosses />} />
          <Route
            path="reporte-consultas/carga-lectiva"
            element={<TeachingLoad />}
          />
          <Route
            path="reporte-consultas/carga-no-lectiva"
            element={<RCNonTeachingLoad />}
          />
          <Route path="reporte-consultas/formatos" element={<Formats />} />
          <Route path="reporte-consultas/propuestas" element={<Proposals />} />
          <Route path="reporte-consultas/consultas" element={<Queries />} />
          <Route path="reporte-consultas/aulas" element={<Classrooms />} />
          <Route
            path="reporte-consultas/comparar-ciclos"
            element={<CompareCycles />}
          />

          Mantenimientos
          <Route path="mantenimientos/docentes" element={<Teachers />} />
          <Route path="mantenimientos/cursos" element={<Courses />} />
          <Route path="mantenimientos/aulas" element={<MClassrooms />} />
          <Route path="mantenimientos/pabellon" element={<Pavilion />} />
          <Route
            path="mantenimientos/parametros-procesos"
            element={<ParametersProcesses />}
          />
          <Route path="mantenimientos/noticias" element={<News />} />
          <Route
            path="mantenimientos/procesos-carga-academica"
            element={<PorcessesAcademicLoad />}
          />
          <Route
            path="mantenimientos/propuesta-docentes"
            element={<TeachersProposals />}
          />

          Propuestas de carga
          <Route
            path="propuestas-carga/aprobar-propuesta-carga"
            element={<ApproveProposedCharge />}
          />
          <Route
            path="propuestas-carga/crear-modificar-propuesta-carga"
            element={<CreateModifyLoadingProposal />}
          />
          <Route
            path="propuestas-carga/asignar-modificaciones-propuestas"
            element={<AssigningChangesToProposals />}
          />

          Opciones
          <Route
            path="opciones/aprobacion-backup-carga"
            element={<LoadBackupApproval />}
          />
          <Route
            path="opciones/actualizar-ponderados"
            element={<UpdateForWeighted />}
          />
          <Route
            path="opciones/reservaciones-aulas"
            element={<ClassroomReservations />}
          /> */}
          </Route>
        </Route>
        <Route
          path="/login/:tokenIntranet"
          element={
            <PortectedRouteLogin>
              <LoginRefactor />
            </PortectedRouteLogin>
            // <ImgNotFoundByeJT to="/NotFound" replace />
          }
        />
        <Route
          path="/login"
          element={
            <PortectedRouteLogin>
              <LoginRefactor />
            </PortectedRouteLogin>
            // <ImgNotFoundByeJT to="/NotFound" replace />
          }
        />
        <Route path="*" element={<ImgNotFound to="/NotFound" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
