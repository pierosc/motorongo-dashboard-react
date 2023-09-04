import Button from "../../Components/Button/Button";
import React from "react";
import SelectClient from "./Modals/SelectClient";
import Modal from "@mui/material/Modal";
import NewTripModalController from "./Modals/NewTripModalController";
import { NewTripProvider } from "./NewTripContext";

function NewTrip() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <NewTripProvider>
      <div className="flex justify-between my-8 items-center">
        <label className="text-2xl">VIAJA EN MOTOCAR</label>
        <Button text="Nuevo viaje" design={"success"} onClick={handleOpen} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <>
          <NewTripModalController />
        </>
      </Modal>
    </NewTripProvider>
  );
}

export default NewTrip;
