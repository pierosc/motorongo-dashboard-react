import Button from "../../Components/Button/Button";
import React from "react";
import SelectClient from "./Modals/SelectClient";
import Modal from "@mui/material/Modal";
import NewTripModalController from "./Modals/NewTripModalController";

function NewTrip() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="flex justify-between mb-8">
        <label>VIAJA EN MOTOCAR</label>
        <Button text="Nuevo viaje" design={"success"} onClick={handleOpen} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <>
          <NewTripModalController />
        </>
      </Modal>
    </>
  );
}

export default NewTrip;
