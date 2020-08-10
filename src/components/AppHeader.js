import React from "react";
import "../styles.css";
import {
  AppBar,
  Tab,
  Tabs,
  MenuItem,
  IconButton,
  Menu,
  Toolbar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const AppHeader = ({ tabValue }) => {
  const tabs = ["/books", "/favorite", "/book", "/users"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  let history = useHistory();

  const handleClick = (event, newValue) => history.push(tabs[newValue]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Tabs value={tabValue} onChange={handleClick}>
              <Tab label="Books" />
              <Tab label="Favorite" />
              <Tab label="Add Book" />
              <Tab label="Users" />
            </Tabs>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={() => console.log("Clicked Logout!")}>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
    </div>
  );
};
