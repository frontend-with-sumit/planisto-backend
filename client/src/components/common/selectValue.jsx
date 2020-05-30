import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const SelectValue = ({ name, label, options, error, ...rest }) => {
  return (
    <>
      <FormControl fullWidth margin="dense" required>
        <InputLabel id="value-select">{label}</InputLabel>
        <Select labelId="value-select" id={name} name={name} {...rest}>
          {options.map((o) => (
            <MenuItem key={o._id || o.name} value={o._id || o.name}>
              {o.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};

export default SelectValue;
