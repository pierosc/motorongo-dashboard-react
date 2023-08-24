import React from "react";
import Box from "@mui/material/Box";
import { ModalBoxStyle } from "../../../Utils/constants";
import SelectFilter from "../../../Components/SelectFilter/SelectFilter";
import Button from "../../../Components/Button/Button";

function SelectClient({ setValue }) {
  return (
    <div
      className="flex flex-col justify-between p-4"
      style={{ minHeight: "45vh" }}
    >
      <label className="text-3xl font-extrabold pt-8">Nuevo Viaje</label>
      <div className="flex flex-col gap-2">
        <SelectFilter style="big" />
        <Button text="Agregar Nuevo Cliente" design={"text"} />
      </div>
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

export default SelectClient;
