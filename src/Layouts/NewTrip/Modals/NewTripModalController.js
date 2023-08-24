import React from "react";
import SelectClient from "./SelectClient";
import NewClient from "./NewClient";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { ModalBoxStyle } from "../../../Utils/constants";
import CalculatePrice from "./CalculatePrice";
import CreateTrip from "./CreateTrip";

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

function NewTripModalController() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={ModalBoxStyle}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SelectClient setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <NewClient setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CalculatePrice setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <CreateTrip setValue={setValue} />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default NewTripModalController;
