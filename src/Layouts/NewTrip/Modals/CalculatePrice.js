import React, { useState, useContext, useEffect, useRef } from "react";
// import Box from "@mui/material/Box";
// import { ModalBoxStyle } from "../../../Utils/constants";
import SelectFilter from "../../../Components/SelectFilter/SelectFilter";
import Button from "../../../Components/Button/Button";
import Input from "./../../../Components/Input/Input";
import NewTripContext from "../NewTripContext";
import debounce from "lodash.debounce";
import usePostRequest from "../../../Hooks/usePostRequest";

function CalculatePrice({ setValue }) {
  const {
    client,
    price,
    setPrice,
    originPoint,
    setOriginPoint,
    destinationPoint,
    setDestinationPoint,
    originRef,
    setOriginRef,
    destinationRef,
    setDestinationRef,
    originLongLat,
    destinationLongLat,
    setDistance,
  } = useContext(NewTripContext);

  const [isPriceCalculated, setIsPriceCalculated] = useState(false);
  const [originAutoComplete, setOriginAutoComplete] = useState([]);
  // const originLongLat = useRef({});
  // const destinationLongLat = useRef({});
  // const distance = useRef({});
  // const [originLongLat, setOriginLongLat] = useState({});
  // const [destinationLongLat, setDestinationLongLat] = useState({});

  const [GetOriginAutoComplete] = usePostRequest(
    `${
      process.env.REACT_APP_TERA_URL + "back-office/google-places-autocomplete"
    }`,
    setOriginAutoComplete
  );

  const GetOriginAutoCompleteDebounce = debounce((place) => {
    GetOriginAutoComplete({
      search_input: place,
    });
  }, 200);

  const [GetDistinationAutoComplete] = usePostRequest(
    `${
      process.env.REACT_APP_TERA_URL + "back-office/google-places-autocomplete"
    }`,
    setOriginAutoComplete
  );

  const GetDistinationAutoCompleteDebounce = debounce((place) => {
    GetDistinationAutoComplete({
      search_input: place,
    });
  }, 200);

  const [getOriginLongLat] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/google-places-get-place"}`,
    // setOriginLongLat,
    {
      placeId: originPoint?.place_id,
    },
    (data) => {
      originLongLat.current = data?.result?.geometry?.location;
    }
  );
  const [getDestinationLongLat] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/google-places-get-place"}`,
    // setDestinationLongLat,
    {
      placeId: destinationPoint?.place_id,
    },
    (data) => {
      destinationLongLat.current = data?.result?.geometry?.location;
    }
  );
  const [getDistance] = usePostRequest(
    `${
      process.env.REACT_APP_TERA_URL + "back-office/google-places-get-distance"
    }`,
    setDistance,
    {
      destinationLat: destinationLongLat.current?.lat,
      destinationLng: destinationLongLat.current?.lng,
      originLat: originLongLat.current?.lat,
      originLng: originLongLat.current?.lng,
    },
    (data) => {
      // console.log(data);
      // console.log(data?.rows[0]?.elements[0]?.distance?.value);
      // setDistance(data)
      getPrice({
        distance: data?.rows[0]?.elements[0]?.distance?.value,
      });
      // distance.current = data;
    }
  );

  const [getPrice] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "api/trip/price"}`,
    setPrice
  );

  useEffect(() => {
    setIsPriceCalculated(false);
  }, [originPoint, destinationPoint]);

  useEffect(() => {
    console.log(client);
  }, []);

  return (
    <div
      className="flex flex-col justify-between p-4"
      style={{ minHeight: "45vh" }}
    >
      <label className="text-3xl font-extrabold pt-8">Nuevo Viaje</label>
      <div className="flex flex-col gap-2">
        <SelectFilter
          label="Punto de Origen"
          style="big"
          data={originAutoComplete?.predictions}
          mapKey={"place_id"}
          option={"description"}
          setSelected={setOriginPoint}
          selected={originPoint}
          onInputChange={(v) => {
            GetOriginAutoCompleteDebounce(v);
          }}
        />
        <Input
          label="Referencia de Origen"
          placeholder="Referencia de Origen"
          value={originRef}
          onChange={(e) => setOriginRef(e.target.value)}
        />
        <SelectFilter
          label="Punto de Destino"
          style="big"
          data={originAutoComplete?.predictions}
          mapKey={"place_id"}
          option={"description"}
          setSelected={setDestinationPoint}
          selected={destinationPoint}
          onInputChange={(v) => {
            GetDistinationAutoCompleteDebounce(v);
          }}
        />
        <Input
          label="Referencia de Destino"
          placeholder="Referencia de Destino"
          value={destinationRef}
          onChange={(e) => setDestinationRef(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          text="Calcular"
          design={"success"}
          onClick={async () => {
            // setPrice("5");
            setIsPriceCalculated(true);
            await getOriginLongLat();
            await getDestinationLongLat();
            if (originLongLat.current && destinationLongLat.current) {
              // console.log(destinationLongLat.current);
              // console.log(originLongLat.current);
              getDistance({
                destinationLat: destinationLongLat.current?.lat,
                destinationLng: destinationLongLat.current?.lng,
                originLat: originLongLat.current?.lat,
                originLng: originLongLat.current?.lng,
              });
            }
          }}
        />
      </div>
      <Input label="Precio" value={price?.price} style={"disabled"} />
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
