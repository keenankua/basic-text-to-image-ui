import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import AIImage from "../resources/ai-image.PNG";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./HomePage.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 0,
  p: 4,
  overflow: "auto",
};

export default function HomePage() {
  const SETTINGS_PRESETS = {
    HYPERREALISM: "Hyperrealism",
    FANTASY: "Fantasy",
    ABSTRACT: "Abstract",
    CUSTOM_1: "Custom 1",
    CUSTOM_2: "Custom 2",
  };

  const MAX_DIMENSION = 4096;

  const [tabValue, setTabValue] = React.useState(0);
  const [widthValue, setWidthValue] = React.useState(512);
  const [heightValue, setHeightValue] = React.useState(512);
  const [settingsPreset, setSettingsPreset] = React.useState(
    SETTINGS_PRESETS.HYPERREALISM
  );
  const [openGeneratedImageModal, setOpenGeneratedImageModal] =
    React.useState(false);

  const handleOpenGeneratedImageModal = () => setOpenGeneratedImageModal(true);
  const handleCloseGeneratedImageModal = () =>
    setOpenGeneratedImageModal(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeSettingsPreset = (event) => {
    setSettingsPreset(event.target.value);
  };

  const handleWidthSliderChange = (event, newValue) => {
    setWidthValue(newValue);
  };

  const handleWidthInputChange = (event) => {
    setWidthValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleHeightSliderChange = (event, newValue) => {
    setHeightValue(newValue);
  };

  const handleHeightInputChange = (event) => {
    setHeightValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleWidthBlur = () => {
    if (widthValue < 1) {
      setWidthValue(1);
    } else if (widthValue > MAX_DIMENSION) {
      setWidthValue(MAX_DIMENSION);
    }
  };

  const handleHeightBlur = () => {
    if (heightValue < 1) {
      setHeightValue(1);
    } else if (heightValue > MAX_DIMENSION) {
      setHeightValue(MAX_DIMENSION);
    }
  };

  return (
    <div className="home-page">
      <header>
        <Typography variant="h1" sx={{ fontSize: 48, fontWeight: "bold" }}>
          Text-to-Image
        </Typography>
      </header>
      <div className="sidebar">
        <a href="/">Trending</a>
        <a href="/">Profile</a>
        <a href="/">Archive</a>
      </div>
      <main>
        <div className="main-content">
          <InputLabel id="prompt-label">
            Enter your prompt here. Try to be as descriptive as possible!
          </InputLabel>
          <TextField labelId="prompt-label" fullWidth />
          <Box sx={{ border: 1, borderColor: "divider" }} className="settings">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Preset settings" {...a11yProps(0)} />
              <Tab label="Advanced settings" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <FormControl>
                <InputLabel id="settings-preset-select-label">
                  Preset
                </InputLabel>
                <Select
                  labelId="settings-preset-select-label"
                  id="settings-preset-select"
                  value={settingsPreset}
                  label="Preset"
                  onChange={handleChangeSettingsPreset}
                  className="preset-select"
                >
                  <MenuItem value={SETTINGS_PRESETS.HYPERREALISM}>
                    {SETTINGS_PRESETS.HYPERREALISM}
                  </MenuItem>
                  <MenuItem value={SETTINGS_PRESETS.FANTASY}>
                    {SETTINGS_PRESETS.FANTASY}
                  </MenuItem>
                  <MenuItem value={SETTINGS_PRESETS.ABSTRACT}>
                    {SETTINGS_PRESETS.ABSTRACT}
                  </MenuItem>
                  <MenuItem value={SETTINGS_PRESETS.CUSTOM_1}>
                    {SETTINGS_PRESETS.CUSTOM_1}
                  </MenuItem>
                  <MenuItem value={SETTINGS_PRESETS.CUSTOM_2}>
                    {SETTINGS_PRESETS.CUSTOM_2}
                  </MenuItem>
                </Select>
              </FormControl>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={3}>
                  <Typography id="input-slider">Width (px)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Slider
                    value={typeof widthValue === "number" ? widthValue : 0}
                    onChange={handleWidthSliderChange}
                    aria-labelledby="input-slider"
                    step={1}
                    min={1}
                    max={MAX_DIMENSION}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiInput
                    value={widthValue}
                    size="small"
                    onChange={handleWidthInputChange}
                    onBlur={handleWidthBlur}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: MAX_DIMENSION,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={3}>
                  <Typography id="input-slider">Height (px)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Slider
                    value={typeof heightValue === "number" ? heightValue : 0}
                    onChange={handleHeightSliderChange}
                    aria-labelledby="input-slider"
                    step={1}
                    min={1}
                    max={MAX_DIMENSION}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiInput
                    value={heightValue}
                    size="small"
                    onChange={handleHeightInputChange}
                    onBlur={handleHeightBlur}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: MAX_DIMENSION,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
              <Typography className="other-settings-text">
                {"<other settings go here>"}
              </Typography>
              <Button variant="text" className="save-preset-button">
                Save as preset
              </Button>
            </TabPanel>
          </Box>
          <Button
            variant="contained"
            className="generate-image-button"
            sx={{ fontSize: 20 }}
            onClick={handleOpenGeneratedImageModal}
          >
            Generate Image
          </Button>
        </div>

        <Modal
          open={openGeneratedImageModal}
          onClose={handleCloseGeneratedImageModal}
          aria-labelledby="Generated image"
          className="generated-image-modal"
        >
          <Box sx={style}>
            <img src={AIImage} alt="generated" />
            <InputLabel id="title-label">Title</InputLabel>
            <TextField labelId="title-label" fullWidth />
            <InputLabel id="caption-label">Caption</InputLabel>
            <TextField labelId="caption-label" fullWidth />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Show prompt"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Show settings"
            />
            <div className="cta-buttons">
              <Button variant="contained">Publish</Button>
              <Button variant="text">Archive</Button>
            </div>
          </Box>
        </Modal>
      </main>
    </div>
  );
}
