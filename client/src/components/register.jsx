import React from "react";
import Joi from "joi-browser";
import { Grid, Typography } from "@material-ui/core";

import Form from "./common/form";
import Message from "./common/message";

import { registerUser } from "../services/userService";
import { getCountries } from "../services/countryService";

class Register extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
    },
    countries: [],
    errors: {},
    showSnackbar: false,
    message: "",
  };

  schema = {
    firstName: Joi.string().min(1).max(255).required().label("FirstName"),
    lastName: Joi.string().min(1).max(255).required().label("lastName"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(15).required().label("Password"),
    country: Joi.string().required().label("Country"),
  };

  async componentDidMount() {
    const countries = await getCountries();
    this.setState({ countries });
  }

  doSubmit = async () => {
    try {
      await registerUser(this.state.data);
      this.props.history.replace("/todos");
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
    const { countries, showSnackbar, message } = this.state;
    return (
      <Grid container direction="column" spacing={9}>
        {showSnackbar && (
          <Message
            open={showSnackbar}
            onClose={this.handleClose}
            severity="error"
            message={message}
          ></Message>
        )}
        <Grid item xs={12}>
          <Typography variant="h3">Register</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" color="textPrimary">
            Welcome!!!
            <br />
            Have a great time planning your day with us.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit}>
            <Grid item sm={12} md={6}>
              {this.renderInput("firstName", "First Name", "text")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderInput("lastName", "Last Name", "text")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderInput("email", "Email", "text")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderInput("password", "Password", "password")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderSelect("country", "Choose Country", countries)}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderBtn("Sign Up")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderFooter("Already have an account?", "Login", "auth")}
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Register;
