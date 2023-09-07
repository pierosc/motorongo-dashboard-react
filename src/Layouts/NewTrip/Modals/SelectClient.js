import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { ModalBoxStyle } from "../../../Utils/constants";
import SelectFilter from "../../../Components/SelectFilter/SelectFilter";
import Button from "../../../Components/Button/Button";
import NewTripContext from "../NewTripContext";
import usePostRequest from "../../../Hooks/usePostRequest";
import debounce from "lodash.debounce";

function SelectClient({ setValue }) {
  const { clientList, setClientList, client, setClient } =
    useContext(NewTripContext);

  const [GetCustomer] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/customer/list"}`,
    setClientList
  );

  const GetCustomerDebounce = debounce((nombre) => {
    GetCustomer({
      search_query: nombre,
    });
  }, 200);

  return (
    <div
      className="flex flex-col justify-between p-4"
      style={{ minHeight: "45vh" }}
    >
      <label className="text-3xl font-extrabold pt-8">Nuevo Viaje</label>
      <div className="flex flex-col gap-2">
        {/* <SelectFilter style="big" /> */}
        <SelectFilter
          label="Pasajero"
          style="big"
          data={clientList?.map((client) => client.fields)}
          mapKey={"identity_document"}
          option={"first_name"}
          setSelected={setClient}
          selected={client}
          // onChange={cambio}
          onInputChange={(v) => {
            GetCustomerDebounce(v);
          }}
        />
        <Button
          text="Agregar Nuevo Cliente"
          design={"text"}
          onClick={() => {
            setValue(1);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          text="Continuar"
          design={Object.keys(client)?.length != 0 ? "success" : "disabled"}
          onClick={() => {
            setValue(2);
          }}
        />
      </div>
    </div>
  );
}

export default SelectClient;
