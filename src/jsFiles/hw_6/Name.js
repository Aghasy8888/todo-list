import { Component } from "react";

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <div>Name: {name}</div>
      </div>
    );
  }
}

export default Name;
