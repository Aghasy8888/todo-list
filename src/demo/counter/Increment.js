import React from "react";
import { connect } from "react-redux";

function Increment(props) {
  return <button onClick={props.onIncrement}>Increment +</button>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch({ type: "INCREMENT" });
    },
  };
};

export default connect(null, mapDispatchToProps)(Increment);
