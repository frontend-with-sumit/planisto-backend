import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Fab,
  Typography,
  TextField,
  Avatar,
} from "@material-ui/core";
import Appbar from "./components/common/appbar";
import "./App.css";

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "rgb(209, 209, 209)",
      fontFamily: "Roboto Condensed",
      fontSize: "1rem",
      letterSpacing: "0.02rem",
      padding: " 0 .5rem",
    },
    "& label.Mui-focused": {
      color: "#7B1FA2",
    },
  },
})(TextField);

function App() {
  return (
    <>
      <Appbar></Appbar>
      <Grid container spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={6}>
            <Button>Sign In</Button>
          </Grid>
          <Grid item xs={1}>
            <Fab size="medium">+</Fab>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph color="textSecondary">
              Just one step away from starting your journey. Please login to
              start planning your day.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <Grid item sm={6}>
                <CssTextField id="Email" label="Email" size="small" fullWidth />
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            <div id="pentagon">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}

export default App;
