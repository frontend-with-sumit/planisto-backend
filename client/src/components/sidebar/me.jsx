import React from "react";
import Joi from "joi-browser";
import UserAvatar from "../common/userAvatar";
import Form from "../common/form";

import { getCountries } from "../../services/countryService";
import { getUserDetails, updateUserDetails } from "../../services/userService";

class Me extends Form {
  state = {
    data: {
      profilePic: "",
      firstName: "",
      lastName: "",
      country: "",
    },
    countries: [],
    errors: {},
  };

  schema = {
    profilePic: Joi.string(),
    firstName: Joi.string().trim().required().label("First Name"),
    lastName: Joi.string().trim().required().label("Last Name"),
    country: Joi.string().trim().required().label("Country"),
  };

  async componentDidMount() {
    const { data } = await getUserDetails();
    const countries = await getCountries();

    this.setState({ data, countries });
  }

  doSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails(this.state.data);
    const { state } = this.props.location;
    window.location = state ? state.from.pathname : "/todos";
  };

  render() {
    const { countries } = this.state;
    const { firstName, profilePic } = this.state.data;
    return (
      <div className="wrapper">
        <div className="image-box">
          <UserAvatar
            onFileSelect={this.fileSelectHandler}
            alt={firstName}
            imgSrc={profilePic}
          ></UserAvatar>
        </div>
        <div className="form-box">
          <form onSubmit={this.doSubmit}>
            {this.renderInput("firstName", "First Name", "text")}
            {this.renderInput("lastName", "Last Name", "text")}
            {this.renderSelect("country", "Choose Country", countries)}
            {this.renderBtn("Save")}
          </form>
        </div>
      </div>
    );
  }
}
export default Me;
