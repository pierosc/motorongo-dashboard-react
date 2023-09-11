import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SelectFilter from "../SelectFilter/SelectFilter";
import Button from "../Button/Button";
import usePostRequest from "../../Hooks/usePostRequest";
import Input from "../Input/Input";

function TripDisplay({ trip, driversList, tripStateList, tripSection }) {
  const [driver, setDriver] = useState({});
  const [tripState, setTripState] = useState({});

  console.log(trip?.driver);
  console.log(driversList);
  console.log(driversList.find((v) => v.pk === trip?.driver));

  useEffect(() => {
    if (tripSection === "Asigned") {
      setDriver(driversList.find((v) => v.pk === trip?.driver));
    }
  }, []);

  return (
    <Paper elevation={3}>
      <div className="grid grid-cols-4 m-4 gap-6 p-4 items-center">
        <PlaceInfo trip={trip} />
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
        />

        <Button
          text="Guardar Cambios"
          design={"success"}
          onClick={() => {
            console.log("Guardar Cambios");
          }}
        />
      </div>
    </Paper>
  );
}

function PlaceInfo({ trip }) {
  const [customer, setCustomer] = useState({
    first_name: "--",
    last_name: "--",
  });

  const [getCustomerData] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "api/trip/customer-name"}`,
    setCustomer,
    { customer_uuid: trip?.customer }
  );

  useEffect(() => {
    getCustomerData();
  }, []);

  const customerName = customer?.first_name + " " + customer?.last_name;
  const destination =
    trip.destination_address.split(",")[0] +
    trip.destination_address.split(",")[1] +
    "/" +
    trip.destination_ref;
  const origin =
    trip.origin_address.split(",")[0] +
    trip.origin_address.split(",")[1] +
    "/" +
    trip.origin_ref;

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
