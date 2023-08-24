import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import { ModalBoxStyle } from "../../../Utils/constants";
import SelectFilter from "../../../Components/SelectFilter/SelectFilter";
import Button from "../../../Components/Button/Button";
import Input from "./../../../Components/Input/Input";
import NewTripContext from "../NewTripContext";

function CalculatePrice({ setValue }) {
  const {
    price,
    setPrice,
    originPoint,
    setOriginPoint,
    destinationPoint,
    setDestinationPoint,
  } = useContext(NewTripContext);

  const [isPriceCalculated, setIsPriceCalculated] = useState(false);

  return (
    <div
      className="flex flex-col justify-between p-4"
      style={{ minHeight: "45vh" }}
    >
      <label className="text-3xl font-extrabold pt-8">Nuevo Viaje</label>
      <div className="flex flex-col gap-2">
        <Input
          //   label="Código"
          placeholder="Punto de Origen"
          value={originPoint}
          onChange={(e) => {
            setOriginPoint(e.target.value);
            setIsPriceCalculated(false);
          }}
          validationType="alphabetic"
        />
        <Input
          //   label="Código"
          placeholder="Punto de Destino"
          value={destinationPoint}
          onChange={(e) => {
            setDestinationPoint(e.target.value);
            setIsPriceCalculated(false);
          }}
          validationType="alphabetic"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          text="Calcular"
          design={"success"}
          onClick={() => {
            setPrice("5");
            setIsPriceCalculated(true);
          }}
        />
      </div>
      <Input label="Precio" value={price} style={"disabled"} />
      <div className="grid grid-cols-2 gap-2">
        <Button
          text="Continuar"
          design={isPriceCalculated ? "success" : "disabled"}
          onClick={() => {
            setValue(3);
          }}
        />
      </div>
    </div>
  );
}

export default CalculatePrice;
