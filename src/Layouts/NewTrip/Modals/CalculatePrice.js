import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { ModalBoxStyle } from "../../../Utils/constants";
import SelectFilter from "../../../Components/SelectFilter/SelectFilter";
import Button from "../../../Components/Button/Button";
import Input from "./../../../Components/Input/Input";
import NewTripContext from "../NewTripContext";
import useGettRequest from "../../../Hooks/useGetRequest";

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
  const [originAutoComplete, setOriginAutoComplete] = useState([]);
  //calcular distancia
  //'https://maps.googleapis.com/maps/api/distancematrix/json?units=meters&destinations=${fields['origin_lat'].toString()}%2C${fields['origin_lon'].toString()}&origins=${fields['destination_lat'].toString()}%2C${fields['destination_lon'].toString()}&key=$googleMapsKey';

  // key = 'AIzaSyC0eFJNXRe00J6s-ChBKhi4ZrrWHOAUBMk';
  // `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:pe&location=-8.393103545126111%2C-74.5832693901913&radius=8000&&
  // key=${process.env.REACT_APP_GOOGLE_KEY}&input=${originPoint}`;

  const [getOriginAutoComplete] = useGettRequest(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:pe&
    location=-8.393103545126111%2C-74.5832693901913
    &
    radius=8000
    &&
    key=${process.env.REACT_APP_GOOGLE_KEY}
    &
    input=${originPoint}`,
    setOriginAutoComplete
  );

  useEffect(() => {
    console.log(originAutoComplete);
  }, [originAutoComplete]);

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
            getOriginAutoComplete();
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
