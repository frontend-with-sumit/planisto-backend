import React, { Component } from "react";
import MidElement from "./common/midElement";

class Home extends Component {
  render() {
    const text =
      "Just one step away from starting your journey. Please login to start planning your day.";
    return (
      <>
        <MidElement text={text} button></MidElement>
      </>
    );
  }
}

export default Home;
