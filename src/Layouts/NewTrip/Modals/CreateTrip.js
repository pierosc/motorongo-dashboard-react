import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { ModalBoxStyle } from "../../../Utils/constants";
import SelectFilter from "../../../Components/SelectFilter/SelectFilter";
import Button from "../../../Components/Button/Button";
import Input from "./../../../Components/Input/Input";
import NewTripContext from "../NewTripContext";
import usePostRequest from "../../../Hooks/usePostRequest";

function CreateTrip({ setValue }) {
  const {
    price,
    originRef,
    originPoint,
    destinationRef,
    destinationPoint,
    driversList,
    setDriversList,
    driver,
    setDriver,
  } = useContext(NewTripContext);

  const [getDriversList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/driver/list"}`,
    setDriversList,
    { driver_state: true }
  );

  useEffect(() => {
    getDriversList();
  }, []);

  return (
    <div
      className="flex flex-col justify-between p-4"
      style={{ minHeight: "45vh" }}
    >
      <label className="text-2xl font-extrabold pt-8">Nuevo Viaje</label>
      <div className="flex flex-col gap-2 overflow-auto">
        <Input
          label="Punto de Origen"
          style={"disabled"}
          value={originPoint?.description}
        />
        <Input
          label="Referencia de Origen"
          value={originRef}
          style={"disabled"}
        />
        <Input
          label="Punto de Destino"
          value={destinationPoint?.description}
          style={"disabled"}
        />
        <Input
          label="Referencia de Destino"
          value={destinationRef}
          style={"disabled"}
        />
        <Input label="Precio" value={price?.price} style={"disabled"} />
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
