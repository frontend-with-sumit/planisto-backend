import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";

import FabBtn from "./fabBtn";

const MidElement = ({ text, button, fab }) => {
  return (
    <>
      <div className="mid">
        <Grid
          container
          direction="column"
          spacing={3}
          alignItems="center"
          justify="center"
        >
          <Grid
            item
            xs={12}
            sm={6}
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <div className="graphic"></div>
            <Typography paragraph color="textSecondary">
              {text}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            {button && (
              <Button variant="outlined" size="small" href="/auth">
                Login / Signup
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
      {fab && <FabBtn></FabBtn>}
    </>
  );
};

export default MidElement;
