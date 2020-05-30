import React from "react";
import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const StartRating = ({ name, label, ...rest }) => {
  return (
    <>
      <Typography variant="body2" component="legend" className="mt">
        {label}
      </Typography>
      <Rating name={name} size="small" {...rest} />
    </>
  );
};

export default StartRating;
