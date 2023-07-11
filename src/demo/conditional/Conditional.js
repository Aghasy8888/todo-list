import React, { Component } from "react";
import styles from "./style.module.css";

class Conditional extends Component {
  state = {
    text1: "Hello!",
    text2: "Bye!",
    showFirst: true,
  };

  Toggle = () => {
    this.setState({
      showFirst: !this.state.showFirst,
    });
  };

  render() {
    const { text1, text2, showFirst } = this.state;
    const headingStyles = {
      color: "blue",
      backgroundColor: "green",
    };
    return (
      <div>
        <h2 style={headingStyles}>{showFirst ? text1 : text2}</h2>

        <button
          onClick={this.Toggle}
          className={styles.btn}
          style={{ color: "blueviolet" }}
        >
          Toggle
        </button>
        <img ></img>
      </div>
    );
  }
}

export default Conditional;
