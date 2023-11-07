import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SelectFilter from "../SelectFilter/SelectFilter";
import Button from "../Button/Button";
import usePostRequest from "../../Hooks/usePostRequest";
import Input from "../Input/Input";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { color } from "../../Utils/Colors";

function TripDisplay({
  trip,
  tripStateList,
  tripSection,
  getTripList,
  setIsEditingATrip,
  isEditingATrip,
}) {
  const [driversList, setDriversList] = useState([]);
  const [driver, setDriver] = useState({});
  const [tripState, setTripState] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [getDriversList] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/driver/list"}`,
    setDriversList,
    { driver_state: true, is_free: true }
  );

  const [AsignDriver] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip/update"}`,
    {
      trip_uuid: trip?.uuid,
      trip_state: "2",
      driver: driver?.pk,
    },
    (data) => {
      setDriver({});
      setTripState({});
      getTripList();
      console.log(data);
    }
  );

  const [EditTrip] = usePostRequest(
    `${process.env.REACT_APP_TERA_URL + "back-office/trip/update"}`,
    {
      trip_uuid: trip?.uuid,
      trip_state: tripState?.id,
      driver: driver?.pk,
    },
    (data) => {
      setDriver({});
      setTripState({});
      getTripList();
      console.log(data);
    }
  );

  useEffect(() => {
    if (editMode) {
      getDriversList();
    } else {
      setDriversList([]);
    }
  }, [editMode]);

  useEffect(() => {
    if (tripSection === "Asigned") {
      setDriver(driversList.find((v) => v.pk === trip?.driver));
      setTripState(tripStateList.find((v) => v.id == trip?.trip_state));
    }
  }, []);

  const customerName = trip?.customer_full_name;
  const destination =
    trip?.destination_address?.split(",")[0] +
    trip?.destination_address?.split(",")[1];
  // "/" +
  // trip?.destination_ref;
  const origin =
    trip?.origin_address?.split(",")[0] + trip?.origin_address?.split(",")[1];
  const CreationDate = trip?.created_at.split("T")[0];
  const CreationHour = trip?.created_at.split("T")[1].split(".")[0];
  const ReservationDate = trip?.booked_datetime.split("T")[0];
  const ReservationHour = trip?.booked_datetime.split("T")[1].split(".")[0];
  console.log(
    "-----------------------------------------------------------------------"
  );
  console.log(trip);
  console.log(
    "-----------------------------------------------------------------------"
  );

  return (
    <Paper elevation={3}>
      <div className="grid grid-cols-6 m-4 gap-6 p-4 items-center">
        {/* <PlaceInfo trip={trip} /> */}
        <div className="grid">
          <div className="font-bold">{customerName}</div>
          <div className="text-xs">
            {trip?.trip_state == "9" ? ReservationDate : CreationDate}
          </div>
          <div className="text-xs">
            {trip?.trip_state == "9" ? ReservationHour : CreationHour}
          </div>
        </div>
        <div className="grid">
          <div className="text-xs font-bold">Destino</div>
          <div className="text-xs mb-2">{destination}</div>
          <div className="text-xs">{trip?.destination_ref}</div>
        </div>
        <div className="grid">
          <div className="text-xs font-bold">Origen</div>
          <div className="text-xs mb-2">{origin}</div>
          <div className="text-xs">{trip?.origin_ref}</div>
        </div>
        {tripSection === "Asigned" ? (
          <SelectFilter
            data={tripStateList}
            label={"Estado de viaje"}
            style={"big"}
            option={"trip_state_name"}
            mapKey={"id"}
            selected={tripState}
            setSelected={setTripState}
          />
        ) : (
          <div></div>
        )}

        {/* //Elegir conductor */}
        <SelectFilter
          data={driversList.map((objeto) => {
            const { model, pk, fields } = objeto;
            console.log(objeto);
            return {
              model: model,
              pk: pk,
              ...fields, // Spread de todas las propiedades dentro de "fields"
            };
          })}
          label={"Elegir conductor"}
          style={"big"}
          option={"first_name"}
          mapKey={"pk"}
          selected={driver}
          setSelected={setDriver}
          disabled={!editMode}
        />
        <div className="grid grid-cols-3 gap-2">
          <Tooltip title="Editar">
            <IconButton
              sx={{ color: color.green }}
              onClick={() => {
                setEditMode(!editMode);
                setIsEditingATrip(!editMode);
                if (editMode) {
                  if (tripSection === "Asigned") {
                    EditTrip();
                  } else {
                    AsignDriver();
                  }
                }
              }}
              // sx={{ color: "white" }}
              disabled={isEditingATrip}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Guardar">
            <IconButton
              sx={{ color: color.yellow }}
              onClick={() => {
                setEditMode(!editMode);
                setIsEditingATrip(!editMode);
                if (editMode) {
                  if (tripSection === "Asigned") {
                    EditTrip();
                  } else {
                    AsignDriver();
                  }
                }
              }}
              // sx={{ color: "white" }}
              disabled={!editMode}
            >
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Cancelar">
            <IconButton
              sx={{ color: color.red }}
              disabled={!editMode}
              onClick={() => {
                setEditMode(false);
                setIsEditingATrip(false);
              }}
              // sx={{ color: "white" }}
              // disabled={isEditingATrip && !editMode}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Paper>
  );
}

// function PlaceInfo({ trip }) {
//   // const [customer, setCustomer] = useState({
//   //   first_name: "--",
//   //   last_name: "--",
//   // });

//   // const [getCustomerData] = usePostRequest(
//   //   `${process.env.REACT_APP_TERA_URL + "api/trip/customer-name"}`,
//   //   setCustomer,
//   //   { customer_uuid: trip?.customer }
//   // );

//   // useEffect(() => {
//   //   getCustomerData();
//   // }, []);

//   const customerName = trip?.customer_full_name;
//   const destination =
//     trip?.destination_address?.split(",")[0] +
//     trip?.destination_address?.split(",")[1] +
//     "/" +
//     trip?.destination_ref;
//   const origin =
//     trip?.origin_address?.split(",")[0] +
//     trip?.origin_address?.split(",")[1] +
//     "/" +
//     trip?.origin_ref;

//   return (
//     <div className="grid ">
//       <div className="font-bold">{customerName}</div>
//       <div className="text-xs">Destino</div>
//       <div className="text-xs mb-2">{destination}</div>
//       <div className="text-xs">Origen</div>
//       <div className="text-xs">{origin}</div>
//     </div>
//   );
// }

export default TripDisplay;
