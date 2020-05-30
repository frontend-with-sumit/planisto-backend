import React from "react";
import { Typography, Grid } from "@material-ui/core";

import Joi from "joi-browser";

import Form from "../common/form";

class Feedback extends Form {
  state = {
    data: {
      usability: 0,
      uiExperience: 0,
      email: "",
      comments: "",
    },
    errors: {},
  };

  schema = {
    usability: Joi.number().integer().min(0).max(5).allow(""),
    uiExperience: Joi.number().integer().min(0).max(5).allow(""),
    email: Joi.string().email().required(),
    comments: Joi.string().required(),
  };

  handleRating = (e) => {
    console.log(e.target.value);
  };

  doSubmit = () => {
    // save data to database and redirect to home screen.

    console.log("feedback successfully submitted");
  };

  render() {
    return (
      <Grid container direction="column" spacing={7}>
        <Grid item xs={12}>
          <Typography variant="h3">Feedback</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" color="textPrimary">
            Please provide your valuable feedback.
            <br />
            This will help us to make this app better for you.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <Grid item sm={12} md={6}>
              {this.renderInput("email", "Email", "text")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderTextArea("comments", 500, "Add comment")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderRating(
                "usability",
                "How easy to use did you find this app?"
              )}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderRating(
                "uiExperience",
                "How much did you like the UI?"
              )}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderBtn("Send Feedback")}
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Feedback;
