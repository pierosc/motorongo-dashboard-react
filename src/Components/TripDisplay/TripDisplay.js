import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SelectFilter from "../SelectFilter/SelectFilter";
import Button from "../Button/Button";
import usePostRequest from "../../Hooks/usePostRequest";

function TripDisplay({ trip, driversList, tripStateList }) {
  return (
    <Paper elevation={3}>
      <div className="grid grid-cols-4 m-4 gap-2 p-4">
        <PlaceInfo trip={trip} />
        <SelectFilter />
        <SelectFilter />
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
  const [customer, setCustomer] = useState({});

  const [getCustomerData] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "api/customer/customer-data"}`,
    setCustomer,
    { firebase_UUID: "gzNyBIfYthOnLkrKgyYc9xnz9Ok1" }
  );

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className="grid ">
      <div className="font-bold">Nombre Completo</div>
      <div className="">
        {trip.destination_address} / {trip.destination_ref}
      </div>
      <div className="">
        {trip.destination_address} / {trip.destination_ref}
      </div>
    </div>
  );
}

export default TripDisplay;
