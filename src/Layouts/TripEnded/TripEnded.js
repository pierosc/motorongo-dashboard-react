// import TripDisplay from "@/app/Components/TripDisplay/TripDisplay";
import React, { useState, useEffect } from "react";
import TripDisplay from "../../Components/TripDisplay/TripDisplay";
import useGettRequest from "../../Hooks/useGetRequest";
import usePostRequest from "../../Hooks/usePostRequest";
import Table from "../../Components/Table/Table";

function TripEnded({ section }) {
  const [tripList, setTripList] = useState([]);
  const [driversList, setDriversList] = useState([]);
  const [tripStateList, setTripStateList] = useState([]);
  const [trip, setTrip] = useState({});

  const [getTripList, loadingTripList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip/list-web"}`,
    setTripList,
    {
      trip_state: section === "Completed" ? [6] : [7], //canceled
    }
  );

  const [getDriversList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/driver/list"}`,
    setDriversList,
    { driver_state: true }
  );

  const [getTripStateList] = useGettRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip-state/list"}`,
    setTripStateList
  );

  useEffect(() => {
    getTripList();
    getDriversList();
    getTripStateList();
  }, []);

  const TableSettings = {
    dense: "small",
    height: "450px",
    order: false,
    elevation: 2,
    selectionType: "single",
    header: [
      {
        align: "left",
      },
    ],
    body: [
      {
        checkbox: false,
        rowSelectable: false,
      },
    ],
  };

  const TableData = {
    header: [
      {
        label: "Pasajero",
        id: "customer_full_name",
      },
      {
        label: "Pasajero Calificación",
        id: "customer_stars",
      },
      {
        label: "Conductor",
        id: "driver_full_name",
      },
      {
        label: "Conductor Calificación",
        id: "driver_stars",
      },
      {
        label: "Origen",
        id: "origin_address",
      },
      {
        label: "Ref Origen",
        id: "origin_ref",
      },
      {
        label: "Destino",
        id: "destination_address",
      },
      {
        label: "Ref Destino",
        id: "destination_ref",
      },
      {
        label: "Distancia",
        id: "distance",
      },
      {
        label: "Precio",
        id: "driverInitialAmount",
      },
    ],
    dataKey: "pk",
    data:
      section === "Completed"
        ? tripList
        : tripList?.map((trip) => ({
            ...trip,
            cancelador: trip?.canceled_motive?.split(" :")[0],
            CancelMotive: trip?.canceled_motive?.split(" :")[1] ?? "",
          })),
  };

  return (
    <div style={{ height: "70vh", overflow: "auto" }}>
      {/* {tripList.map((trip, index) => (
        <TripDisplay
          trip={trip?.fields}
          driversList={driversList?.map((driver) => driver.fields)}
          tripStateList={tripStateList}
          tripSection={section}
        />
      ))} */}
      <Table
        settings={TableSettings}
        data={
          section === "completed"
            ? TableData
            : {
                ...TableData,
                header: [
                  ...TableData.header,
                  { label: "Cancelador", id: "cancelador" },
                  { label: "Motivo", id: "CancelMotive" },
                ],
              }
        }
        selected={trip}
        setSelected={setTrip}
        loading={loadingTripList}
      />
    </div>
  );
}

export default TripEnded;
