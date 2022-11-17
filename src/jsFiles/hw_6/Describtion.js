import { Component } from "react";

class Describtion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { describtion } = this.props;
    return <div>Describtion: {describtion}</div>;
  }
}

export default Describtion;
