import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SelectFilter from "../SelectFilter/SelectFilter";
import Button from "../Button/Button";
import usePostRequest from "../../Hooks/usePostRequest";
import Input from "../Input/Input";

function TripDisplay({
  trip,
  driversList,
  tripStateList,
  tripSection,
  getTripList,
  setIsEditingATrip,
  isEditingATrip,
}) {
  const [driver, setDriver] = useState({});
  const [tripState, setTripState] = useState({});
  const [editMode, setEditMode] = useState(false);

  console.log(trip?.driver);
  console.log(driversList);
  console.log(driversList.find((v) => v.pk === trip?.driver));

  const [AsignDriver] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip/update"}`,
    // setDriversList,
    {
      trip_uuid: trip?.uuid,
      trip_state: "2",
      driver: driver?.pk,
    },
    (data) => {
      setDriver({});
      setTripState({});
      getTripList();
      console.log(data);
    }
  );

  const [EditTrip] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip/update"}`,
    // setDriversList,
    {
      trip_uuid: trip?.uuid,
      trip_state: tripState?.id,
      driver: driver?.pk,
    },
    (data) => {
      setDriver({});
      setTripState({});
      getTripList();

      console.log(data);
    }
  );

  useEffect(() => {
    if (tripSection === "Asigned") {
      setDriver(driversList.find((v) => v.pk === trip?.driver));
      setTripState(tripStateList.find((v) => v.id == trip?.trip_state));
      // console.log(driversList.find((v) => v.pk === trip?.driver));

      // console.log("-----");

      // console.log(tripStateList);
      // console.log(trip?.trip_state);
      // console.log(tripStateList.find((v) => v.id == trip?.trip_state));
      // console.log("-----");
    }
  }, []);

  const customerName = trip?.customer_full_name;
  const destination =
    trip?.destination_address?.split(",")[0] +
    trip?.destination_address?.split(",")[1];
  // "/" +
  // trip?.destination_ref;
  const origin =
    trip?.origin_address?.split(",")[0] + trip?.origin_address?.split(",")[1];

  return (
    <Paper elevation={3}>
      <div className="grid grid-cols-6 m-4 gap-6 p-4 items-center">
        {/* <PlaceInfo trip={trip} /> */}
        <div className="font-bold">{customerName}</div>
        <div className="grid">
          <div className="text-xs font-bold">Destino</div>
          <div className="text-xs mb-2">{destination}</div>
          <div className="text-xs">{trip?.destination_ref}</div>
        </div>
        <div className="grid">
          <div className="text-xs font-bold">Origen</div>
          <div className="text-xs mb-2">{origin}</div>
          <div className="text-xs">{trip?.origin_ref}</div>
        </div>
        {tripSection === "Asigned" ? (
          <SelectFilter
            data={tripStateList}
            label={"Estado de viaje"}
            style={"big"}
            option={"trip_state_name"}
            mapKey={"id"}
            selected={tripState}
            setSelected={setTripState}
          />
        ) : (
          <div></div>
        )}

        {/* //Elegir conductor */}
        <SelectFilter
          data={driversList}
          label={"Elegir conductor"}
          style={"big"}
          option={"first_name"}
          mapKey={"pk"}
          selected={driver}
          setSelected={setDriver}
          disabled={!editMode}
        />

        <Button
          text={!editMode ? "Editar" : "Guardar Cambios"}
          design={isEditingATrip && !editMode ? "disabled" : "success"}
          onClick={() => {
            setEditMode(!editMode);
            setIsEditingATrip(!editMode);
            // if(editMode){
            //   isEditingATrip(false)
            // }
            if (editMode) {
              if (tripSection === "Asigned") {
                EditTrip();
              } else {
                AsignDriver();
              }
            }
          }}
        />
      </div>
    </Paper>
  );
}

function PlaceInfo({ trip }) {
  // const [customer, setCustomer] = useState({
  //   first_name: "--",
  //   last_name: "--",
  // });

  // const [getCustomerData] = usePostRequest(
  //   `${process.env.REACT_APP_TERA_URL + "api/trip/customer-name"}`,
  //   setCustomer,
  //   { customer_uuid: trip?.customer }
  // );

  // useEffect(() => {
  //   getCustomerData();
  // }, []);

  const customerName = trip?.customer_full_name;
  const destination =
    trip?.destination_address?.split(",")[0] +
    trip?.destination_address?.split(",")[1] +
    "/" +
    trip?.destination_ref;
  const origin =
    trip?.origin_address?.split(",")[0] +
    trip?.origin_address?.split(",")[1] +
    "/" +
    trip?.origin_ref;

  return (
    <div className="grid ">
      <div className="font-bold">{customerName}</div>
      <div className="text-xs">Destino</div>
      <div className="text-xs mb-2">{destination}</div>
      <div className="text-xs">Origen</div>
      <div className="text-xs">{origin}</div>
    </div>
  );
}

export default TripDisplay;
