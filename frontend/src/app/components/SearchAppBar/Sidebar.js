"use client";

import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const Sidebar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  const toggleDrawer =
    (anchor, open) =>
    (event) => {
      if (
        event.type === 'keydown' &&
        ((event).key === 'Tab' ||
          (event).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 'auto', background: 'darkred', height: '100vh', color: 'whitesmoke'}}
      role="presentation"
    >
      <List>
        <ListItem>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
              style={{textAlign: 'center'}}
            >
              Filters
            </Typography>
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary={"From:"} style={{marginRight: 10}}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker views={['year']} disableFuture/>
          </LocalizationProvider>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText primary={"To:"} style={{marginRight: 10}}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker views={['year']} disableFuture/>
          </LocalizationProvider>
        </ListItem>
        <Divider />

          <ListItem>
            <LightTooltip title={"Search for a specific phrase in the Title/Abstract"} placement={"bottom-end"}>
              <ListItemText primary={"Advanced Search"} style={{marginRight: 10}}/>
            </LightTooltip>
            <LightTooltip title={"Search for a specific phrase in the Title/Abstract"} placement={"bottom-end"}>
              <Checkbox style={{ color: 'whitesmoke' }}/>
            </LightTooltip>
          </ListItem>
          <Divider />

        <ListItem>
          <ListItemButton style={{ borderRight: 'solid', textAlign: 'center', borderColor: '#1c1c1c', borderWidth: 2 }}
            onClick={toggleDrawer("left", false)}>
            <ListItemText primary={"Apply Filters"}/>
          </ListItemButton>
          <ListItemButton style={{ textAlign: 'center' }}>
            <ListItemText primary={"Reset Filters"}/>
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      {(['left']).map((anchor) => (
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

export default Sidebar