import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { ModalBoxStyle } from "../../../Utils/constants";
import SelectFilter from "../../../Components/SelectFilter/SelectFilter";
import Button from "../../../Components/Button/Button";
import Input from "./../../../Components/Input/Input";
import NewTripContext from "../NewTripContext";

function CreateTrip({ setValue }) {
  const {
    price,
    setPrice,
    originPoint,
    setOriginPoint,
    destinationPoint,
    setDestinationPoint,
  } = useContext(NewTripContext);

  return (
    <div
      className="flex flex-col justify-between p-4"
      style={{ minHeight: "45vh" }}
    >
      <label className="text-3xl font-extrabold pt-8">Nuevo Viaje</label>
      <div className="flex flex-col gap-2 overflow-auto">
        <Input
          label="Punto de Origen"
          style={"disabled"}
          value={originPoint}
          //   onChange={(e) => setOriginPoint(e.target.value)}
        />
        <Input
          label="Punto de Destino"
          style={"disabled"}
          value={destinationPoint}
          //   onChange={(e) => setDestinationPoint(e.target.value)}
        />
        <Input
          label="Referencia de Origen"
          placeholder="Referencia de Origen"
          value={originPoint}
          onChange={(e) => setOriginPoint(e.target.value)}
          validationType="alphabetic"
        />
        <Input
          //   label="Código"
          placeholder="Punto de Destino"
          value={destinationPoint}
          onChange={(e) => setDestinationPoint(e.target.value)}
          validationType="alphabetic"
        />
        <Input
          //   label="Código"
          placeholder="Punto de Origen"
          value={originPoint}
          onChange={(e) => setOriginPoint(e.target.value)}
          validationType="alphabetic"
        />
        <Input
          //   label="Código"
          placeholder="Punto de Destino"
          value={destinationPoint}
          onChange={(e) => setDestinationPoint(e.target.value)}
          validationType="alphabetic"
        />
      </div>

      <Input
        //   label="Código"
        //   placeholder="Ingrese su código"
        value={price}
        style={"disabled"}
        //   onChange={(e) => setPrice(e.target.value)}
        //   validationType="numeric"
      />
      <div className="grid grid-cols-2 gap-2">
        <Button
          text="Continuar"
          design={"success"}
          onClick={() => {
            setValue(1);
          }}
        />
      </div>
    </div>
  );
}

export default CreateTrip;
