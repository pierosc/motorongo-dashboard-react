import React from "react";
import Paper from "@mui/material/Paper";
import SelectFilter from "../SelectFilter/SelectFilter";
import Button from "../Button/Button";

function TripDisplay() {
  return (
    <Paper elevation={3}>
      <div className="grid grid-cols-4 m-4 gap-2 p-4">
        <PlaceInfo />
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

function PlaceInfo() {
  return (
    <div className="grid ">
      <div className="font-bold">Nombre Completo</div>
      <div className="">Origen / Ref</div>
      <div className="">Destino / Ref</div>
    </div>
  );
}

export default TripDisplay;
