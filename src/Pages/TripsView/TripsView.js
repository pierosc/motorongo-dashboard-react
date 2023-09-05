import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import PropTypes from "prop-types";
// import TabPanel from "@mui/lab/TabPanel";
// import TripList from "../../Layouts/AsignedTrips/AsignedTrips";
import NewTrip from "../../Layouts/NewTrip/NewTrip";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import AsignedTrips from "../../Layouts/AsignedTrips/AsignedTrips";
import TripsToAsign from "../../Layouts/AsignedTrips/TripsToAsign";
import TripsPanel from "../../Layouts/TripsPanel/TripsPanel";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Box sx={{ typography: "body1" }}>
      <NewTrip />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Viajes No Asignados" {...a11yProps(0)} />
            <Tab label="Viajes Asignados" {...a11yProps(1)} />
            <Tab label="Completados" {...a11yProps(2)} />
            <Tab label="Cancelados" {...a11yProps(3)} />
          </TabList>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TripsPanel section={"NoAsigned"} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <TripsPanel section={"Asigned"} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <TripsPanel section={"Completed"} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <TripsPanel section={"Canceled"} />
          </TabPanel>
        </SwipeableViews>
      </TabContext>
    </Box>
  );
}

export default TripsView;
