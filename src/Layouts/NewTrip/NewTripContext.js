import { createContext, useState, useRef } from "react";

const NewTripContext = createContext();

const NewTripProvider = ({ children }) => {
  // ****************************************************************************
  // VALORES DEL VIAJE
  // ****************************************************************************
  const [client, setClient] = useState({});
  const [originPoint, setOriginPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [originRef, setOriginRef] = useState("");
  const [destinationRef, setDestinationRef] = useState("");
  const [price, setPrice] = useState("");
  const [distance, setDistance] = useState({});
  const [driver, setDriver] = useState({});
  const originLongLat = useRef({});
  const destinationLongLat = useRef({});
  // ****************************************************************************
  // VALORES DEL PASAJERO NUEVO
  // ****************************************************************************

  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [cellPhone, setCellPhone] = useState("");

  // ****************************************************************************
  // LISTAS DE VALORES
  // ****************************************************************************

  const [clientList, setClientList] = useState([]);
  const [driversList, setDriversList] = useState([]);

  return (
    <NewTripContext.Provider
      value={{
        // TRIP VALUES----
        client,
        setClient,
        originPoint,
        setOriginPoint,
        destinationPoint,
        setDestinationPoint,
        originRef,
        setOriginRef,
        destinationRef,
        setDestinationRef,
        price,
        setPrice,
        distance,
        setDistance,
        driver,
        setDriver,
        originLongLat,
        destinationLongLat,
        // NEW CUSTOMER VALUES----
        fullName,
        setFullName,
        document,
        setDocument,
        cellPhone,
        setCellPhone,

        // LISTS VALUES----
        clientList,
        setClientList,
        driversList,
        setDriversList,
      }}
    >
      {children}
    </NewTripContext.Provider>
  );
};

export { NewTripProvider };
export default NewTripContext;
