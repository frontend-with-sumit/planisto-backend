import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { Typography, FormControl, TextareaAutosize } from "@material-ui/core";

import SelectValue from "./selectValue";
import InputField from "./inputField";
import StarRating from "./rating";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleShowSnackbar = () => {
    this.setState({ setOpen: true });
  };

  handlCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;

    this.setState({ setOpen: false });
  };

  handleSelectValue = (e) => {
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;

    this.setState({ data });
  };

  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <InputField
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      ></InputField>
    );
  };

  renderTextArea = (name, maxChars, placeholder) => {
    const { data } = this.state;
    return (
      <>
        <FormControl margin="dense" fullWidth>
          <TextareaAutosize
            name={name}
            value={data[name]}
            rowsMin={3}
            onChange={this.handleChange}
            placeholder={placeholder}
            maxLength={maxChars || false}
          />
          {maxChars && (
            <span className="wordsLeft">
              {maxChars - data[name].length} / {`${maxChars}`}
            </span>
          )}
        </FormControl>
      </>
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <SelectValue
        name={name}
        label={label}
        options={options}
        value={data[name]}
        onChange={this.handleSelectValue}
        error={errors[name]}
      ></SelectValue>
    );
  };

  renderRating = (name, label) => {
    const { data } = this.state;
    return (
      <StarRating
        name={name}
        label={label}
        value={Number.parseInt(data[name])}
        onChange={this.handleChange}
      ></StarRating>
    );
  };

  renderBtn = (label) => {
    return (
      <button className="btn" disabled={this.validate()}>
        {label}
      </button>
    );
  };

  renderFooter = (label, btnText, path) => {
    return (
      <Typography variant="caption" color="textSecondary">
        {label}
        <Link to={`/${path}`} className="link">
          <span> {btnText}</span>
        </Link>
      </Typography>
    );
  };
}

export default Form;
