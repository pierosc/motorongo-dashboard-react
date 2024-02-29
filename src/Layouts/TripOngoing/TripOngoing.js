// import TripDisplay from "@/app/Components/TripDisplay/TripDisplay";
import React, { useState, useEffect } from "react";
import TripDisplay from "../../Components/TripDisplay/TripDisplay";
import useGettRequest from "../../Hooks/useGetRequest";
import usePostRequest from "../../Hooks/usePostRequest";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import debounce from "lodash.debounce";

function TripOngoing({ section, tripList, setTripList }) {
  const [tripStateList, setTripStateList] = useState([]);
  const [isEditingATrip, setIsEditingATrip] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [getTripList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip/list-web"}`,
    setTripList,
    {
      trip_state:
        section === "NoAsigned"
          ? [1]
          : section === "Reserved"
          ? [9]
          : [2, 3, 4, 5, 8], //Ongoing
    }
  );

  const [getTripStateList] = useGettRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip-state/list"}`,
    setTripStateList
  );

  useEffect(() => {
    getTripList();
    getTripStateList();
  }, []);

  useEffect(() => {
    const intervalId = setTimeout(function runFunction() {
      getTripList();
      setTimeout(runFunction, 120000);
    }, 120000); // Intervalo de 2 minutos en milisegundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   document.addEventListener("visibilitychange", function () {
  //     if (document.visibilityState === "visible") {
  //       console.log("La pestaña se ha vuelto activa");
  //       getTripList();
  //     }
  //   });

  //   return () => {
  //     document.removeEventListener("visibilitychange", () => {});
  //   };
  // }, []);

  const TripSearch = debounce((data) => {
    getTripList({
      trip_state:
        section === "NoAsigned"
          ? [1]
          : section === "Reserved"
          ? [9]
          : [2, 3, 4, 5, 8], //Ongoing
      search_query: data,
      days_before: 100,
    });
  }, 200);

  return (
    <div style={{ height: "70vh", overflow: "auto" }}>
      <div className="grid lg:grid-cols-5 gap-4 items-end mb-4">
        <div className="col-span-4">
          <Input
            label="Buscar Viaje por..."
            placeholder="Origen, Destino, Referencias, Nombre o DNI de pasajero o conductor..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              TripSearch(e.target.value);
            }}
          />
        </div>

        <Button
          text={"Actualizar"}
          design={"success"}
          onClick={() => {
            getTripList();
          }}
        />
      </div>

      {tripList.map((trip, index) => (
        <TripDisplay
          trip={trip}
          tripStateList={tripStateList}
          tripSection={section}
          getTripList={getTripList}
          setIsEditingATrip={setIsEditingATrip}
          isEditingATrip={isEditingATrip}
        />
      ))}
    </div>
  );
}

export default TripOngoing;
