// import TripDisplay from "@/app/Components/TripDisplay/TripDisplay";
import React, { useState, useEffect } from "react";
import TripDisplay from "../../Components/TripDisplay/TripDisplay";
import useGettRequest from "../../Hooks/useGetRequest";
import usePostRequest from "../../Hooks/usePostRequest";

function AsignedTrips() {
  const [tripList, setTripList] = useState([]);
  const [driversList, setDriversList] = useState([]);
  const [tripStateList, setTripStateList] = useState([]);

  const [getTripList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip/list-web"}`,
    setTripList,
    { trip_state: 6 }
  );

  const [getDriversList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/driver/list"}`,
    setDriversList,
    { driver_state: true }
  );

  const [getTripStateList] = useGettRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip-state/list"}`,
    setTripStateList
  );

  useEffect(() => {
    getTripList();
    getDriversList();
    getTripStateList();
  }, []);

  return (
    <div style={{ height: "70vh", overflow: "auto" }}>
      {tripList.map((trip, index) => (
        <TripDisplay
          trip={trip?.fields}
          driversList={driversList?.map((driver) => driver.fields)}
          tripStateList={tripStateList}
        />
      ))}
    </div>
  );
}

export default AsignedTrips;
