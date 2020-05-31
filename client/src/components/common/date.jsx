import React from "react";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const PickDate = ({ name, selectedDate, onChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id={name}
        label="Choose Date"
        format="dd/MM/yyyy"
        value={selectedDate}
        inputValue={selectedDate}
        onChange={(date, value, key = name) => onChange(date, value, key)}
        clearable
        required
      />
    </MuiPickersUtilsProvider>
  );
};

export default PickDate;
