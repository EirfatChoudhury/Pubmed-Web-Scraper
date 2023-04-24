import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setFrom, setTo, setAdvancedSearch } from "../../slices/searchSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    left: false,
  });
  const [checked, setChecked] = useState(false);
  const [yearFrom, setYearFrom] = useState(null);
  const [yearTo, setYearTo] = useState(null);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const applyFilters = async () => {
    if (yearFrom > yearTo) {
      document.getElementById("alert").style.display = "block";

      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 5000);

      return;
    }

    dispatch(setFrom(yearFrom));
    dispatch(setTo(yearTo));
    dispatch(setAdvancedSearch(checked));
  };

  const resetFilters = () => {
    dispatch(setFrom(null));
    dispatch(setTo(null));
    dispatch(setAdvancedSearch(false));
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  const list = (anchor) => (
    <Box
      sx={{
        width: "auto",
        background: "darkred",
        height: "100vh",
        color: "whitesmoke",
      }}
      role="presentation"
    >
      <List>
        <ListItem>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ textAlign: "center" }}
          >
            Filters
          </Typography>
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary={"From:"} style={{ marginRight: 10 }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              disableFuture
              onChange={(event) => setYearFrom(event["$y"])}
            />
          </LocalizationProvider>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText primary={"To:"} style={{ marginRight: 10 }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              disableFuture
              onChange={(event) => setYearTo(event["$y"])}
            />
          </LocalizationProvider>
        </ListItem>
        <Divider />

        <ListItem>
          <LightTooltip
            title={"Search for only the most relevant results"}
            placement={"bottom-end"}
          >
            <ListItemText
              primary={"Advanced Search"}
              style={{ marginRight: 10 }}
            />
          </LightTooltip>
          <LightTooltip
            title={"Search for only the most relevant results"}
            placement={"bottom-end"}
          >
            <Checkbox
              checked={checked}
              onChange={handleCheckChange}
              inputProps={{ "aria-label": "controlled" }}
              style={{ color: "whitesmoke" }}
            />
          </LightTooltip>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemButton
            style={{ textAlign: "center" }}
            onClick={applyFilters}
          >
            <ListItemText primary={"Apply Filters"} />
          </ListItemButton>
          <ListItemButton
            style={{ textAlign: "center" }}
            onClick={resetFilters}
          >
            <ListItemText primary={"Reset Filters"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemButton
            style={{ textAlign: "center" }}
            onClick={toggleDrawer("left", false)}
          >
            <ListItemText primary={"Close"} />
          </ListItemButton>
        </ListItem>

        <div id="alert" style={{ display: "none" }}>
          <Stack
            sx={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 2.5,
            }}
          >
            <Alert variant="filled" severity="error">
              Years invalid
            </Alert>
          </Stack>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
