import React from "react";
import { connect } from "react-redux";

function Decrement(props) {
  return <button onClick={props.onDecrement}>Decrement -</button>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDecrement: () => {
      dispatch({ type: "DECREMENT" });
    },
  };
};

export default connect(null, mapDispatchToProps)(Decrement);
