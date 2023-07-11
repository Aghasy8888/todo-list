import React, { Component } from "react";

export default class Input extends Component {
  state = {
    text: "545454",
  };
  changeHandler = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeHandler} />
        <button>Click Me</button>
        <h2>{this.state.text}</h2>
      </div>
    );
  }
}
