import React, { Component } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import Sidebar from "./sidebar";
import { getUserDetails } from "../../services/userService";

class Appbar extends Component {
  state = {
    user: [],
    drawerOpen: false,
    isLoggedIn: false,
  };

  async componentDidMount() {
    if (localStorage.getItem("token")) {
      const { data: user } = await getUserDetails();
      this.setState({ user, isLoggedIn: true });
    }
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  redirectToTodos = () => {
    window.location.replace("/todos");
  };

  render() {
    const { isLoggedIn, user, drawerOpen } = this.state;
    const currentLocation = window.location.pathname;

    return (
      <>
        <AppBar position="fixed" color="primary">
          <Toolbar variant="regular">
            {isLoggedIn && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={this.handleDrawerToggle}
                style={{ marginRight: "1rem" }}
              >
                <i className="fas fa-bars" style={{ fontSize: "1rem" }}></i>
              </IconButton>
            )}
            <Typography variant="h6" className="appbar-title">
              Planist-o
            </Typography>
            {isLoggedIn && currentLocation !== "/todos" && (
              <IconButton
                size="small"
                color="secondary"
                onClick={this.redirectToTodos}
              >
                <i className="fas fa-home"></i>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Sidebar
          user={user}
          mobileOpen={drawerOpen}
          onDrawerToggle={this.handleDrawerToggle}
        ></Sidebar>
        <div style={{ paddingBottom: "3rem" }}></div>
      </>
    );
  }
}

export default Appbar;
