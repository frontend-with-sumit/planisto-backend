import React from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { Grid, Typography } from "@material-ui/core";

import Form from "./common/form";
import Message from "./common/message";

import { login, getCurrentUser } from "../services/userService";

class Auth extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    showSnackbar: false,
    message: "",
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(15).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/todos";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        this.setState({ showSnackbar: true, message: ex.response.data });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ showSnackbar: false });
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/todos"></Redirect>;

    const { showSnackbar, message } = this.state;
    return (
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3">Login</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" color="textPrimary">
            Hi there! <br /> Welcome back.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <Grid item sm={12} md={6}>
              {this.renderInput("email", "Email", "text")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderInput("password", "Password", "password")}
            </Grid>
            <Grid item sm={12} md={6}>
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography variant="caption" gutterBottom>
                  Forgot your password?
                </Typography>
              </Link>
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderBtn("Sign In")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderFooter(
                "Don't have an account?",
                "Register",
                "register"
              )}
            </Grid>
          </form>
          {showSnackbar && (
            <Message
              open={showSnackbar}
              onClose={this.handleClose}
              severity="error"
              message={message}
            ></Message>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default Auth;
