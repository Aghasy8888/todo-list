import React, { useState } from "react";
import { connect } from "react-redux";

function ShowCount(props) {
  return (
    <h2>
      Count: {props.value}
      Message: {props.message}
    </h2>
  );
}

const mapStateToProps = (state) => {
  return {
    value: state.count,
    message: state.message,
  };
};

export default connect(mapStateToProps)(ShowCount);
