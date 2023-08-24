// import TripDisplay from "@/app/Components/TripDisplay/TripDisplay";
import React from "react";
import TripDisplay from "../../Components/TripDisplay/TripDisplay";
function TripList() {
  let tripList = [0, 1, 2, 3];

  return (
    <>
      {tripList.map((v) => (
        <TripDisplay />
      ))}
    </>
  );
}

export default TripList;
