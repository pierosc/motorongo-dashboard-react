import React, { useContext, useState } from "react";
import Button from "../../../Components/Button/Button";
import { toast } from "react-toastify";
import { hasEmptyValues } from "../../../Utils/Helpers";
import NewTripContext from "../NewTripContext";
import Input from "../../../Components/Input/Input";
import usePostRequest from "../../../Hooks/usePostRequest";

function NewClient({ setValue, handleClose }) {
  const { setClient } = useContext(NewTripContext);
  const [customerName, setCustomerName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerDoc, setCustomerDoc] = useState("");

  const customerData = {
    first_name: customerName,
    last_name: customerLastName,
    identity_document: customerDoc,
    phone: customerPhone,
  };

  const [createCustomer] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/customer/create"}`,
    customerData,
    () => {
      toast.success("Pasajero creado", { theme: "dark" });
      GetCustomerList();
    },
    () => {
      toast.error("Algo salió mal", { theme: "dark" });
    }
  );

  const [GetCustomerList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/customer/list"}`,
    { search_query: customerData?.first_name },
    (list) => {
      let newCustomer = list
        ?.map((client) => client.fields)
        .find(
          (customer) =>
            customerData?.identity_document === customer?.identity_document
        );
      console.log(newCustomer);
      setClient(newCustomer);
      toast.success("Pasajero seleccionado", { theme: "dark" });
      setValue(2);
    },
    () => {
      toast.error("Error al seleccionar", { theme: "dark" });
      setClient({});
      setValue(0);
    }
  );

  return (
    <div
      className="flex flex-col justify-between p-4"
      style={{ minHeight: "45vh" }}
    >
      <label className="text-3xl font-extrabold pt-8">Nuevo Cliente</label>
      <div className="flex flex-col gap-2">
        <Input
          label="Nombres"
          placeholder="Nombres"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          validationType="alphabetic"
        />
        <Input
          label="Apellidos"
          placeholder="Apellidos"
          value={customerLastName}
          onChange={(e) => setCustomerLastName(e.target.value)}
          validationType="alphabetic"
        />
        <Input
          label="Documento de Identidad"
          placeholder="DNI"
          charlength={8}
          value={customerDoc}
          onChange={(e) => setCustomerDoc(e.target.value)}
          validationType="numeric"
        />
        <Input
          label="Celular"
          placeholder="Celular"
          charlength={9}
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          validationType="numeric"
        />
      </div>
      <Button
        text="Cancelar"
        design={"cancel"}
        onClick={() => {
          handleClose();
        }}
      />
      <Button
        text="Continuar"
        design={"success"}
        onClick={() => {
          if (hasEmptyValues(customerData)) {
            toast.error("Llenar campos vacios", { theme: "dark" });
          } else {
            createCustomer();
          }
        }}
      />
    </div>
  );
}

export default NewClient;
