import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, Tooltip, IconButton, Avatar } from "@material-ui/core";

import { apiUrl } from "../../config.json";
import axios from "axios";

const useStyles = makeStyles({
  image: {
    height: "7rem",
    width: "7rem",
    border: "6px solid white",
    boxShadow: "2px 3px 6px rgba(9, 11, 18, 0.17)",
  },
});

const fileSelectHandler = (event) => {
  const selectedFile = event.target.files[0];
  const formData = new FormData();
  formData.append("myFile", selectedFile, selectedFile.name);

  axios.put(`${apiUrl}/register/upload`, formData, {}).then((res) => {
    window.location.reload();
  });
};

const UserBadge = ({ alt, imgSrc }) => {
  const classes = useStyles();

  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={
        <div className="camera">
          <form>
            <input
              id="icon-button-file"
              type="file"
              name="myFile"
              style={{ display: "none" }}
              onChange={fileSelectHandler}
            />
            <label htmlFor="icon-button-file">
              <Tooltip title="Upload" arrow>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <i className="camera-icon fas fa-camera-retro" />
                </IconButton>
              </Tooltip>
            </label>
          </form>
        </div>
      }
    >
      <Avatar className={classes.image} alt={alt} src={imgSrc} />
    </Badge>
  );
};

export default UserBadge;
