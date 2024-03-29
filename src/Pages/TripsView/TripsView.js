import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import PropTypes from "prop-types";
import NewTrip from "../../Layouts/NewTrip/NewTrip";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripOngoing from "../../Layouts/TripOngoing/TripOngoing";
import TripEnded from "../../Layouts/TripEnded/TripEnded";
import { color } from "../../Utils/Colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TripsView() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [tripList, setTripList] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Box sx={{ typography: "body1" }}>
      <NewTrip setTripList={setTripList} />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Viajes No Asignados" {...a11yProps(0)} />
            <Tab label="Viajes Asignados" {...a11yProps(1)} />
            <Tab label="Viajes Reservados" {...a11yProps(2)} />
            <Tab label="Completados" {...a11yProps(3)} />
            <Tab label="Cancelados" {...a11yProps(4)} />
          </TabList>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TripOngoing
              section={"NoAsigned"}
              tripList={tripList}
              setTripList={setTripList}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <TripOngoing
              section={"Asigned"}
              tripList={tripList}
              setTripList={setTripList}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <TripOngoing
              section={"Reserved"}
              tripList={tripList}
              setTripList={setTripList}
            />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <TripEnded section={"Completed"} />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <TripEnded section={"Canceled"} />
          </TabPanel>
        </SwipeableViews>
      </TabContext>
      <ToastContainer />
    </Box>
  );
}

export default TripsView;
