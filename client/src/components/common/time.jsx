import React from "react";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

function PickTime({ name, selectedDate, onChange }) {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin="normal"
          id={name}
          label="Choose Time"
          mask="__:__ _M"
          value={selectedDate}
          inputValue={selectedDate}
          onChange={(date, value, key = name) => onChange(date, value, key)}
          keyboardIcon={<i className="far fa-clock clock"></i>}
          clearable
          required
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

export default PickTime;
