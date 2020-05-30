import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Hidden, Typography, Avatar } from "@material-ui/core";

import MenuItems from "./menuItems";

import { getItems } from "../../services/menuService.js";

const drawerWidth = 275;

const useStyles = makeStyles({
  drawerPaper: {
    width: drawerWidth,
  },
  username: {
    marginTop: "1.3rem",
    fontFamily: "Roboto Condensed",
    fontSize: "1.1rem",
    letterSpacing: "1px",
    fontWeight: 700,
    textAlign: "center",
  },
  image: {
    height: "7rem",
    width: "7rem",
    border: "6px solid white",
    boxShadow: "2px 3px 6px rgba(9, 11, 18, 0.17)",
  },
});

const Sidebar = ({ user, mobileOpen, onDrawerToggle }) => {
  const classes = useStyles();
  const menuItems = getItems();

  const { firstName, lastName, profilePic, country } = user;

  return (
    <div>
      <nav>
        <Hidden xsUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={onDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className="sidebar-wrapper">
              <div className="sidebar-graphic"></div>
              <div className="sidebar">
                <div className="userProfile">
                  <Avatar
                    className={classes.image}
                    alt={firstName}
                    src={profilePic}
                  />
                  <Typography className={classes.username} variant="body2">
                    {`${firstName} ${lastName}`}
                  </Typography>
                  <div className="userDetails">
                    <Typography variant="subtitle1" color="secondary">
                      <i className="fas fa-map-marker"></i> {country}
                    </Typography>
                  </div>
                </div>
                <MenuItems items={menuItems}></MenuItems>
              </div>
            </div>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Sidebar;
