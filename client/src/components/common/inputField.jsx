import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

const InputField = ({ name, label, type, error, ...rest }) => {
  return (
    <>
      <FormControl margin="dense" required fullWidth>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Input
          id={name}
          type={type}
          name={name}
          autoComplete="off"
          autoCapitalize="on"
          {...rest}
        />
      </FormControl>
      <br />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};

export default InputField;
