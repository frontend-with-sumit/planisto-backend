import React from "react";
import Joi from "joi-browser";
import { Grid, Typography } from "@material-ui/core";

import Form from "./common/form";
import Message from "./common/message";

import { resetPassword } from "../services/userService";

class ForgotPassword extends Form {
  state = {
    data: { email: "", password: "", confirmPassword: "" },
    errors: {},
    showSnackbar: false,
    message: "",
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(15).required().label("Password"),
    confirmPassword: Joi.string()
      .min(6)
      .max(15)
      .required()
      .label("Confirm Password"),
  };

  doSubmit = async () => {
    // redirect to the todos screen
    try {
      await resetPassword(this.state.data);
      this.props.history.replace("/auth");
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
    const { showSnackbar, message } = this.state;
    return (
      <>
        <Grid container direction="column" spacing={9}>
          <Grid item xs={12}>
            <Typography variant="h3">Reset Password</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" color="textPrimary">
              Forgot Password!!!
              <br />
              No problem. We are here to help.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <Grid item sm={12} md={6}>
                {this.renderInput("email", "Registered Email", "text")}
              </Grid>
              <Grid item sm={12} md={6}>
                {this.renderInput("password", "New Password", "password")}
              </Grid>
              <Grid item sm={12} md={6}>
                {this.renderInput(
                  "confirmPassword",
                  "Confirm Password",
                  "password"
                )}
              </Grid>
              <Grid item sm={12} md={6}>
                {this.renderBtn("Reset Password")}
              </Grid>
              <Grid item sm={12} md={6}>
                {this.renderFooter("Already have an account?", "Login", "auth")}
              </Grid>
            </form>
          </Grid>
          {showSnackbar && (
            <Message
              open={showSnackbar}
              onClose={this.handleClose}
              severity="error"
              message={message}
            ></Message>
          )}
        </Grid>
      </>
    );
  }
}

export default ForgotPassword;
